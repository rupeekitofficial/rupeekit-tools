# Salary Only — reel build kit

Turns the storyboard into a finished 1080×1920 reel. Ten still illustrations, a voiceover,
and a text layer, assembled with hard cuts.

Storyboard (durations, teardown, rationale): see the published artifact.
Machine-readable source of truth for the build: `scenes.json`.

## The one rule that matters

**Image models must never render text.** Every title, column label and caption is drawn by
libass as real vector type, from `scenes.json`. The reference reel baked its text into the
artwork and scene 8 came out as "multiple incomeest opportunities" — garbled letterforms are
the classic signature of text left to an image model. Keeping text out of the art is what
makes ours reproducible: fix a typo, rerun `make-ass.mjs`, done. No re-generation, no redraw.

## Pipeline

```
scenes.json ──> image model ──> art/scene-NN-{left,right}.png
                                     │
                                     ├─ compose.mjs ──> frames/scene-NN.png   (1080×1920)
                                     │
voiceover ──> forced alignment ──> words.json
                                     │
                                     ├─ make-ass.mjs ──> captions.ass
                                     │
                                     └─ render.sh ────> salary-only-1080x1920.mp4
```

## 1. Generate the art

Each scene needs two half-images. Build every prompt as:

```
<stylePreamble>  +  <scene.promptLeft or promptRight>
```

both read from `scenes.json`, with `negativePrompt` applied. Generate at 540×1000 or larger,
any aspect — `compose.mjs` fits them.

Generate the halves **separately**. A single split-screen prompt drifts in line weight
between the two sides and invents a divider that wanders; separate halves keep the divider
exact and let you re-roll one side without losing the other.

For style consistency across all twenty images: fix the seed, reuse `stylePreamble` verbatim
(never paraphrase it), and generate scene 1 first — once one side looks right, feed it back
as a style/reference image for the rest.

Scene 10's right half is a screen recording of the live calculator, not an illustration.
Drop it in as `art/scene-10-right.png` (a still) or swap the frame in your editor.

## 2. Voiceover

Record or synthesise the ten `vo` lines from `scenes.json`. Target **~3.0 words/second** —
the reference runs 92 words in 30 seconds. Save as `vo.m4a`.

Then get **word-level timings**, which is what drives the karaoke caption:

- Most TTS APIs return word or character timestamps directly — use those.
- Otherwise force-align the recording against the script (`whisperx`, `stable-ts`, or
  Montreal Forced Aligner) and export word start/end times.

Write them to `words.json`:

```json
[{ "word": "If", "start": 0.31, "end": 0.44 }, ...]
```

Without `words.json` the generator spreads each line evenly across its scene. That is fine
for a timing check and always looks slightly off the beat — real timings are what fix it.

## 3. Build and render

```bash
node compose.mjs scenes.json art frames
node make-ass.mjs scenes.json words.json > captions.ass
./render.sh
```

Set your brand faces (they must be installed on the machine doing the render):

```bash
REEL_FONT_DISPLAY="Archivo Black" REEL_FONT_CAPTION="Archivo Black" \
  node make-ass.mjs scenes.json words.json > captions.ass
```

`render.sh` normalises audio to −14 LUFS with a −1.0 dBTP ceiling, encodes H.264 at CRF 18,
and trims to the storyboard's exact total.

## Animation

There is none, by design — the reference cuts hard on every scene and never moves a pixel,
which is what keeps it reading as an argument rather than a slideshow. It is also why ten
stills are enough.

If you want a little life without breaking the style, add a slow push to the video filter
chain in `render.sh`:

```
zoompan=z='min(zoom+0.0004,1.04)':d=1:s=1080x1920:fps=30
```

Keep it under 4% and apply it to every scene equally. Anything more and the flat whiteboard
look starts to fight the motion.

## Environment

`render.sh` and `compose.mjs` take `FFMPEG=/path/to/ffmpeg` if ffmpeg is not on `PATH`.
The build needs an ffmpeg with **libass** (`ass` filter). Check with:

```bash
ffmpeg -filters | awk '{print $2}' | grep -x ass
```

`drawtext` is not required — all text goes through the ASS layer.
