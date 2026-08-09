from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, features
import json
import math
import shutil
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
HERO = ROOT / 'public/images/discover/fcra-2-0-india-2026-explained.webp'
MEDIA = ROOT / 'public/media/fcra-2026'
TMP = ROOT / '.tmp-fcra-media'
FRAMES = TMP / 'frames'
MEDIA.mkdir(parents=True, exist_ok=True)
FRAMES.mkdir(parents=True, exist_ok=True)
HERO.parent.mkdir(parents=True, exist_ok=True)

NAVY = '#003080'
DEEP = '#002070'
GREEN = '#43A047'
SOFT = '#F8FAFC'
BORDER = '#E5EAF0'
TEXT = '#0F172A'
MUTED = '#64748B'
WHITE = '#FFFFFF'
AMBER = '#E89A22'
AMBER_SOFT = '#FFF7E8'
GREEN_SOFT = '#EDF8EF'
BLUE_SOFT = '#EEF4FF'
RED_SOFT = '#FFF0F0'
RED = '#B74242'

FONT_REG = Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
FONT_BOLD = Path('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')


def require_tools() -> None:
    if not features.check('webp'):
        raise RuntimeError('Pillow WebP encoder unavailable')
    if not FONT_REG.exists() or not FONT_BOLD.exists():
        raise RuntimeError('DejaVu Sans fonts unavailable')
    for tool in ('ffmpeg', 'ffprobe'):
        if not shutil.which(tool):
            raise RuntimeError(f'{tool} unavailable')


def font(size: int, bold: bool = False):
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REG), size=size)


def rr(d, box, radius, fill, outline=None, width=1):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit_lines(d, text: str, f, max_width: int):
    lines, current = [], ''
    for word in text.split():
        candidate = word if not current else f'{current} {word}'
        if d.textbbox((0, 0), candidate, font=f)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(d, x, y, text, f, fill, max_width, spacing=8):
    h = d.textbbox((0, 0), 'Ag', font=f)[3]
    for line in fit_lines(d, text, f, max_width):
        d.text((x, y), line, font=f, fill=fill)
        y += h + spacing
    return y


def brand_tag(d, x, y, dark=False):
    rr(d, (x, y, x + 192, y + 46), 23, WHITE if dark else DEEP)
    d.text((x + 96, y + 22), 'RUPEEKIT', font=font(24, True), fill=DEEP if dark else WHITE, anchor='mm')


def status_pill(d, x, y, label, value, green=True):
    fg = GREEN if green else AMBER
    bg = GREEN_SOFT if green else AMBER_SOFT
    rr(d, (x, y, x + 340, y + 96), 20, bg, fg, 2)
    d.text((x + 170, y + 29), label.upper(), font=font(17, True), fill=fg, anchor='mm')
    d.text((x + 170, y + 69), value, font=font(28, True), fill=fg, anchor='mm')


def save_webp(im: Image.Image, path: Path) -> None:
    im.save(path, 'WEBP', quality=82, method=6)


def draw_hero() -> None:
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), SOFT)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 260), fill=DEEP)
    d.ellipse((-60, -20, 300, 340), fill='#073787')
    d.ellipse((1190, -160, 1670, 320), fill='#0B3E91')
    d.ellipse((470, 470, 1170, 1170), fill='#F0F4FA')
    brand_tag(d, 72, 54, True)
    d.text((72, 126), 'ORIGINAL FCRA 2026 EXPLAINER', font=font(22, True), fill='#CFE0FF')
    d.text((800, 322), 'FCRA 2026', font=font(68, True), fill=DEEP, anchor='mm')
    d.text((800, 382), 'What is in force — and what is still pending?', font=font(31, True), fill=TEXT, anchor='mm')
    status_pill(d, 430, 430, 'Rules dated 22 Jun 2026', 'IN FORCE', True)
    status_pill(d, 830, 430, 'Bill introduced 25 Mar 2026', 'PENDING', False)
    y = 664
    d.line((80, y, 980, y), fill='#B9C9E6', width=6)
    milestones = [(110, '25 MAR', 'Bill introduced', 'PENDING', AMBER), (510, '22 JUN', 'Amendment Rules', 'IN FORCE', GREEN), (900, '30 JUN', 'FCRA 2.0 portal', 'LAUNCHED', NAVY)]
    for x, dt, label, state, color in milestones:
        d.ellipse((x - 14, y - 14, x + 14, y + 14), fill=color)
        d.text((x, y + 34), dt, font=font(18, True), fill=color, anchor='ma')
        d.text((x, y + 64), label, font=font(19, True), fill=TEXT, anchor='ma')
        d.text((x, y + 91), state, font=font(16, True), fill=MUTED, anchor='ma')
    bx, by = 1080, 604
    rr(d, (bx, by, 1520, 824), 28, WHITE, BORDER, 2)
    d.text((bx + 28, by + 26), 'FCRA CERTIFICATE SNAPSHOT', font=font(18, True), fill=DEEP)
    rows = [('~14.4K', 'Active', GREEN), ('~22.5K', 'Cancelled', RED), ('~15.2K', 'Expired', AMBER)]
    yy = by + 78
    for value, label, color in rows:
        d.text((bx + 28, yy), value, font=font(27, True), fill=color)
        d.text((bx + 150, yy + 3), label, font=font(20, True), fill=TEXT)
        yy += 45
    d.text((bx + 28, 799), 'Checked 9 Aug 2026 • verify live portal', font=font(14, True), fill=MUTED)
    d.text((80, 858), 'Official-source facts • original RupeeKit artwork • no broadcaster/news assets', font=font(17, True), fill=MUTED)
    save_webp(im, HERO)


def draw_timeline() -> None:
    W, H = 1080, 1350
    im = Image.new('RGB', (W, H), SOFT)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 210), fill=DEEP)
    brand_tag(d, 64, 52, True)
    d.text((64, 126), 'FCRA 2026 TIMELINE', font=font(42, True), fill=WHITE)
    d.text((64, 178), 'Three milestones. Two different legal statuses.', font=font(24, True), fill='#D7E4FF')
    cards = [('25 MAR 2026', 'AMENDMENT BILL INTRODUCED', 'Introduced in Lok Sabha. Digital Sansad lists the Bill as pending.', 'PENDING', AMBER, AMBER_SOFT), ('22 JUN 2026', 'AMENDMENT RULES DATED', 'Foreign Contribution (Regulation) (Amendment) Rules, 2026.', 'IN FORCE', GREEN, GREEN_SOFT), ('30 JUN 2026', 'FCRA 2.0 PORTAL LAUNCHED', 'PIB records the launch of the redesigned FCRA 2.0 portal.', 'LAUNCHED', NAVY, BLUE_SOFT)]
    y = 270
    for i, (date, title, desc, status, color, bg) in enumerate(cards):
        if i < 2:
            d.line((110, y + 160, 110, y + 315), fill='#C7D5EB', width=8)
        d.ellipse((88, y + 22, 132, y + 66), fill=color)
        rr(d, (165, y, 1010, y + 260), 30, WHITE, BORDER, 2)
        d.text((205, y + 34), date, font=font(22, True), fill=color)
        d.text((205, y + 77), title, font=font(29, True), fill=TEXT)
        draw_wrapped(d, 205, y + 132, desc, font(23), MUTED, 650, 10)
        rr(d, (765, y + 180, 962, y + 230), 20, bg, color, 2)
        d.text((864, y + 205), status, font=font(18, True), fill=color, anchor='mm')
        y += 300
    rr(d, (64, 1168, 1016, 1274), 24, BLUE_SOFT, '#D9E4F6', 2)
    d.text((96, 1198), 'KEY DISTINCTION', font=font(18, True), fill=DEEP)
    d.text((96, 1231), 'The Rules are in force. The Bill is not law while it remains pending.', font=font(23, True), fill=TEXT)
    d.text((64, 1316), 'Verified 9 Aug 2026 • Sources: FCRA Online, PIB, Digital Sansad', font=font(15, True), fill=MUTED)
    save_webp(im, MEDIA / 'fcra-2026-timeline.webp')


def draw_snapshot() -> None:
    W, H = 1080, 1350
    im = Image.new('RGB', (W, H), SOFT)
    d = ImageDraw.Draw(im)
    brand_tag(d, 64, 52)
    d.text((64, 134), 'FCRA certificate snapshot', font=font(48, True), fill=DEEP)
    d.text((64, 198), 'Rounded live-portal totals, checked 9 August 2026', font=font(24, True), fill=MUTED)
    entries = [('~14.4K', 'ACTIVE', GREEN, GREEN_SOFT, 'Currently active associations'), ('~22.5K', 'CANCELLED', RED, RED_SOFT, 'Certificates shown as cancelled'), ('~15.2K', 'EXPIRED', AMBER, AMBER_SOFT, 'Associations shown as deemed expired')]
    y = 300
    for value, label, color, bg, desc in entries:
        rr(d, (64, y, 1016, y + 235), 30, WHITE, BORDER, 2)
        rr(d, (92, y + 40, 330, y + 195), 26, bg)
        d.text((211, y + 94), value, font=font(49, True), fill=color, anchor='mm')
        d.text((211, y + 150), label, font=font(19, True), fill=color, anchor='mm')
        d.text((380, y + 74), desc, font=font(27, True), fill=TEXT)
        d.text((380, y + 126), 'Live totals can change as certificates are', font=font(21), fill=MUTED)
        d.text((380, y + 158), 'renewed, cancelled or expire.', font=font(21), fill=MUTED)
        y += 270
    rr(d, (64, 1130, 1016, 1260), 26, AMBER_SOFT, '#F1D5A7', 2)
    d.text((96, 1164), 'FRESHNESS WARNING', font=font(18, True), fill='#9A5E00')
    draw_wrapped(d, 96, 1201, 'Treat these as a dated snapshot, not permanent figures. Verify the current FCRA Online public dashboard.', font(22, True), TEXT, 850, 8)
    d.text((64, 1316), 'Source: Ministry of Home Affairs — FCRA Online public dashboard', font=font(15, True), fill=MUTED)
    save_webp(im, MEDIA / 'fcra-registration-snapshot-2026.webp')


def draw_rules_bill() -> None:
    W, H = 1080, 1350
    im = Image.new('RGB', (W, H), SOFT)
    d = ImageDraw.Draw(im)
    brand_tag(d, 64, 52)
    d.text((64, 132), 'Rules vs Bill: do not mix them up', font=font(45, True), fill=DEEP)
    d.text((64, 194), 'A simple status check for FCRA 2026', font=font(24, True), fill=MUTED)
    y, h, gap = 292, 820, 28
    cw = (952 - gap) // 2
    left = (64, y, 64 + cw, y + h)
    right = (64 + cw + gap, y, 1016, y + h)
    rr(d, left, 32, WHITE, GREEN, 3)
    rr(d, right, 32, WHITE, AMBER, 3)
    rr(d, (left[0] + 20, y + 22, left[2] - 20, y + 116), 24, GREEN_SOFT)
    rr(d, (right[0] + 20, y + 22, right[2] - 20, y + 116), 24, AMBER_SOFT)
    d.text(((left[0] + left[2]) // 2, y + 68), 'RULES — IN FORCE', font=font(25, True), fill=GREEN, anchor='mm')
    d.text(((right[0] + right[2]) // 2, y + 68), 'BILL — PENDING', font=font(25, True), fill=AMBER, anchor='mm')
    lx, ly = left[0] + 36, y + 160
    d.text((lx, ly), '22 JUN 2026', font=font(21, True), fill=GREEN)
    ly += 48
    draw_wrapped(d, lx, ly, 'Foreign Contribution (Regulation) (Amendment) Rules, 2026', font(27, True), TEXT, cw - 72, 10)
    ly += 145
    d.line((lx, ly, lx + cw - 72, ly), fill=BORDER, width=2)
    ly += 35
    d.text((lx, ly), '30 JUN 2026', font=font(21, True), fill=NAVY)
    ly += 48
    draw_wrapped(d, lx, ly, 'FCRA 2.0 portal launched', font(27, True), TEXT, cw - 72, 10)
    ly += 98
    d.text((lx, ly), 'What this means:', font=font(20, True), fill=MUTED)
    ly += 42
    draw_wrapped(d, lx, ly, 'These are current operational facts and should be treated separately from proposals in the Bill.', font(23), TEXT, cw - 72, 10)
    rx, ry = right[0] + 36, y + 160
    d.text((rx, ry), '25 MAR 2026', font=font(21, True), fill=AMBER)
    ry += 48
    draw_wrapped(d, rx, ry, 'Foreign Contribution (Regulation) Amendment Bill, 2026 introduced in Lok Sabha', font(27, True), TEXT, cw - 72, 10)
    ry += 210
    d.line((rx, ry, rx + cw - 72, ry), fill=BORDER, width=2)
    ry += 35
    d.text((rx, ry), 'STATUS', font=font(20, True), fill=MUTED)
    ry += 44
    d.text((rx, ry), 'PENDING', font=font(37, True), fill=AMBER)
    ry += 68
    draw_wrapped(d, rx, ry, 'A proposal in a pending Bill should not be presented as an enacted rule.', font(23), TEXT, cw - 72, 10)
    rr(d, (64, 1150, 1016, 1268), 26, BLUE_SOFT, '#D9E4F6', 2)
    d.text((96, 1184), 'EDITORIAL RULE', font=font(18, True), fill=DEEP)
    d.text((96, 1222), 'Say what is law now. Label proposals as pending until status changes.', font=font(23, True), fill=TEXT)
    d.text((64, 1316), 'Status verified 9 Aug 2026 • Digital Sansad + FCRA Online + PIB', font=font(15, True), fill=MUTED)
    save_webp(im, MEDIA / 'fcra-rules-vs-bill-2026.webp')


def video_frame(i: int) -> Path:
    W, H = 360, 640
    im = Image.new('RGB', (W, H), SOFT)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 118), fill=DEEP)
    rr(d, (20, 24, 138, 58), 16, WHITE)
    d.text((79, 41), 'RUPEEKIT', font=font(15, True), fill=DEEP, anchor='mm')
    d.text((20, 82), 'FCRA 2026', font=font(28, True), fill=WHITE)
    if i == 0:
        d.text((24, 168), 'What is in force?', font=font(31, True), fill=DEEP)
        d.text((24, 208), 'What is still pending?', font=font(28, True), fill=TEXT)
        rr(d, (24, 280, 336, 365), 24, GREEN_SOFT, GREEN, 2)
        d.text((44, 309), 'RULES', font=font(18, True), fill=GREEN)
        d.text((316, 323), 'IN FORCE', font=font(25, True), fill=GREEN, anchor='rm')
        rr(d, (24, 388, 336, 473), 24, AMBER_SOFT, AMBER, 2)
        d.text((44, 417), 'BILL', font=font(18, True), fill=AMBER)
        d.text((316, 431), 'PENDING', font=font(25, True), fill=AMBER, anchor='rm')
        d.text((24, 548), 'Status verified 9 Aug 2026', font=font(15, True), fill=MUTED)
    elif i == 1:
        d.text((24, 154), 'Three milestones', font=font(29, True), fill=DEEP)
        yy = 225
        for date, label, state, color in [('25 MAR', 'Bill introduced', 'PENDING', AMBER), ('22 JUN', 'Rules dated', 'IN FORCE', GREEN), ('30 JUN', 'Portal launched', 'LIVE', NAVY)]:
            d.ellipse((31, yy + 2, 51, yy + 22), fill=color)
            d.line((41, yy + 22, 41, yy + 105), fill='#C7D5EB', width=4)
            d.text((68, yy), date, font=font(16, True), fill=color)
            d.text((68, yy + 28), label, font=font(20, True), fill=TEXT)
            d.text((68, yy + 58), state, font=font(15, True), fill=MUTED)
            yy += 115
        d.text((24, 590), 'Rules are in force. Bill remains pending.', font=font(14, True), fill=MUTED)
    elif i == 2:
        d.text((24, 154), 'Certificate snapshot', font=font(29, True), fill=DEEP)
        d.text((24, 192), 'Checked 9 Aug 2026', font=font(16, True), fill=MUTED)
        yy = 250
        for value, label, color, bg in [('~14.4K', 'ACTIVE', GREEN, GREEN_SOFT), ('~22.5K', 'CANCELLED', RED, RED_SOFT), ('~15.2K', 'EXPIRED', AMBER, AMBER_SOFT)]:
            rr(d, (24, yy, 336, yy + 86), 22, WHITE, BORDER, 1)
            rr(d, (38, yy + 14, 145, yy + 72), 16, bg)
            d.text((92, yy + 43), value, font=font(24, True), fill=color, anchor='mm')
            d.text((172, yy + 43), label, font=font(18, True), fill=TEXT, anchor='lm')
            yy += 103
        d.text((24, 574), 'Live totals change — verify FCRA Online.', font=font(14, True), fill=MUTED)
    else:
        d.text((24, 152), 'Do not mix status', font=font(29, True), fill=DEEP)
        rr(d, (24, 222, 336, 356), 24, GREEN_SOFT, GREEN, 2)
        d.text((44, 249), 'RULES', font=font(17, True), fill=GREEN)
        d.text((44, 286), 'IN FORCE', font=font(31, True), fill=GREEN)
        d.text((44, 326), 'Dated 22 Jun 2026', font=font(14, True), fill=MUTED)
        rr(d, (24, 382, 336, 516), 24, AMBER_SOFT, AMBER, 2)
        d.text((44, 409), 'BILL', font=font(17, True), fill=AMBER)
        d.text((44, 446), 'PENDING', font=font(31, True), fill=AMBER)
        d.text((44, 486), 'Introduced 25 Mar 2026', font=font(14, True), fill=MUTED)
        d.text((24, 574), 'Verify current Bill status before relying.', font=font(14, True), fill=MUTED)
    d.text((20, 620), 'Original RupeeKit media • official-source facts', font=font(11, True), fill=MUTED)
    path = FRAMES / f'frame{i + 1}.png'
    im.save(path, 'PNG')
    return path


def synth_audio() -> Path:
    sr, dur = 48000, 12.0
    t = np.arange(int(sr * dur)) / sr
    x = np.zeros_like(t)
    for i, fq in enumerate((220.0, 277.18, 329.63, 440.0)):
        amp = 0.035 / ((i + 1) ** 0.35)
        x += amp * np.sin(2 * np.pi * fq * t + i * 0.7) * (0.65 + 0.35 * np.sin(2 * np.pi * (0.08 + i * 0.015) * t + i))
    for beat in (0, 3, 6, 9):
        mask = (t >= beat) & (t < beat + 0.7)
        tt = t[mask] - beat
        x[mask] += 0.028 * np.sin(2 * np.pi * 660 * tt) * np.exp(-5 * tt)
    fade = int(sr * 0.8)
    env = np.ones_like(x)
    env[:fade] = np.linspace(0, 1, fade)
    env[-fade:] = np.linspace(1, 0, fade)
    pcm = (np.clip(x * env, -0.95, 0.95) * 32767).astype('<i2')
    path = TMP / 'track.wav'
    with wave.open(str(path), 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())
    return path


def encode_video() -> Path:
    frames = [video_frame(i) for i in range(4)]
    audio = synth_audio()
    concat = TMP / 'frames.txt'
    with concat.open('w', encoding='utf-8') as fh:
        for frame in frames:
            fh.write(f"file '{frame.as_posix()}'\n")
            fh.write('duration 3\n')
        fh.write(f"file '{frames[-1].as_posix()}'\n")
    target = MEDIA / 'fcra-2-0-india-2026-explainer.mp4'
    subprocess.run([
        'ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(concat), '-i', str(audio),
        '-vf', 'fps=30,scale=360:640:flags=lanczos,format=yuv420p', '-t', '12', '-c:v', 'libx264', '-profile:v', 'high',
        '-crf', '23', '-c:a', 'aac', '-b:a', '96k', '-shortest', '-movflags', '+faststart', str(target)
    ], check=True)
    return target


def verify() -> None:
    expected = [(HERO, (1600, 900)), (MEDIA / 'fcra-2026-timeline.webp', (1080, 1350)), (MEDIA / 'fcra-registration-snapshot-2026.webp', (1080, 1350)), (MEDIA / 'fcra-rules-vs-bill-2026.webp', (1080, 1350))]
    for path, size in expected:
        data = path.read_bytes()
        if data[:4] != b'RIFF' or data[8:12] != b'WEBP':
            raise RuntimeError(f'Invalid WebP container: {path}')
        with Image.open(path) as im:
            im.load()
            if im.size != size:
                raise RuntimeError(f'Wrong image dimensions: {path} {im.size}')
    if HERO.stat().st_size > 350_000:
        raise RuntimeError('Discover hero exceeds 350 KB')
    video = MEDIA / 'fcra-2-0-india-2026-explainer.mp4'
    probe = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_name,codec_type,width,height', '-show_entries', 'format=duration', '-of', 'json', str(video)], check=True, text=True, capture_output=True)
    info = json.loads(probe.stdout)
    streams = info['streams']
    v = next(s for s in streams if s['codec_type'] == 'video')
    a = next(s for s in streams if s['codec_type'] == 'audio')
    duration = float(info['format']['duration'])
    if v['codec_name'] != 'h264' or (v['width'], v['height']) != (360, 640) or a['codec_name'] != 'aac' or not 11.9 <= duration <= 12.1:
        raise RuntimeError(f'Unexpected video probe: {info}')
    subprocess.run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'], check=True)
    print('FCRA media generated and verified')
    for path, _ in expected:
        print(path.relative_to(ROOT), path.stat().st_size)
    print(video.relative_to(ROOT), video.stat().st_size, f'{duration:.3f}s h264/aac 360x640')


if __name__ == '__main__':
    require_tools()
    draw_hero()
    draw_timeline()
    draw_snapshot()
    draw_rules_bill()
    encode_video()
    verify()
