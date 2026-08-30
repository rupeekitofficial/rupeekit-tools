#!/usr/bin/env bash
# Assemble the reel: composited scene frames + voiceover + text layer -> master mp4.
#
#   ./render.sh                       # uses frames/ vo.m4a captions.ass
#   FFMPEG=/path/to/ffmpeg ./render.sh
#
# There are no transitions by design. The reference reel cuts hard on every scene and
# that is what keeps it feeling like a argument rather than a slideshow.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

FF="${FFMPEG:-ffmpeg}"
SCENES="${SCENES:-scenes.json}"
FRAMES="${FRAMES:-frames}"
ASS="${ASS:-captions.ass}"
VO="${VO:-vo.m4a}"
OUT="${OUT:-salary-only-1080x1920.mp4}"

for f in "$SCENES" "$ASS"; do
  [ -f "$f" ] || { echo "missing $f" >&2; exit 1; }
done

# Build an ffconcat playlist holding each still for its exact storyboard duration.
PLAYLIST="$(mktemp)"
trap 'rm -f "$PLAYLIST"' EXIT
{
  echo "ffconcat version 1.0"
  node -e '
    const fs=require("fs"), path=require("path");
    const doc=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));
    const dir=path.resolve(process.argv[2]);
    // Paths must be absolute: ffconcat resolves relative entries against the playlist
    // file, which lives in a temp dir, not against the working directory.
    const frame=(id)=>path.join(dir,`scene-${String(id).padStart(2,"0")}.png`);
    for(const s of doc.scenes){
      const f=frame(s.id);
      if(!fs.existsSync(f)){console.error(`missing ${f}`);process.exit(1);}
      console.log(`file ${f}`);
      console.log(`duration ${(s.end-s.start).toFixed(3)}`);
    }
    // ffconcat drops the final entry unless the last file is repeated.
    console.log(`file ${frame(doc.scenes[doc.scenes.length-1].id)}`);
  ' "$SCENES" "$FRAMES"
} > "$PLAYLIST"

VIDEO_FILTER="scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:white,ass=${ASS},format=yuv420p"

# The playlist repeats its last frame so ffconcat honours the final duration, which leaves
# one extra scene-length hold on the tail. Trim back to the storyboard's exact total.
TOTAL="$(node -e '
  const doc=require("fs").readFileSync(process.argv[1],"utf8");
  const s=JSON.parse(doc).scenes;
  process.stdout.write((s[s.length-1].end - s[0].start).toFixed(3));
' "$SCENES")"

if [ -f "$VO" ]; then
  echo "rendering with voiceover: $VO"
  "$FF" -hide_banner -loglevel warning -y \
    -f concat -safe 0 -i "$PLAYLIST" \
    -i "$VO" \
    -vf "$VIDEO_FILTER" \
    -r 30 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 192k \
    -af "loudnorm=I=-14:TP=-1.0:LRA=11" \
    -t "$TOTAL" -shortest -movflags +faststart "$OUT"
else
  echo "no $VO found - rendering a silent timing check"
  "$FF" -hide_banner -loglevel warning -y \
    -f concat -safe 0 -i "$PLAYLIST" \
    -vf "$VIDEO_FILTER" \
    -r 30 -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -t "$TOTAL" -movflags +faststart "$OUT"
fi

echo "wrote $OUT"
"$FF" -hide_banner -i "$OUT" 2>&1 | grep -E "Duration|Stream" || true
