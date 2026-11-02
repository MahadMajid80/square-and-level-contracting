#!/usr/bin/env bash
# Turns one source clip (any format ffmpeg reads) into the three web-ready hero files.
#   npm run video:prepare -- path/to/clip.mov           # fast encode (default)
#   npm run video:prepare -- path/to/clip.mov --best    # slower, smaller files
# Requires ffmpeg (https://ffmpeg.org/download.html). Output: public/video/hero-woodworking*.{mp4,webm}
set -euo pipefail
IN="${1:?Usage: npm run video:prepare -- <input-video> [--best]}"
PRESET="veryfast"; DEADLINE="realtime"; CPU=8
if [[ "${2:-}" == "--best" ]]; then PRESET="slow"; DEADLINE="good"; CPU=2; fi
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/video"
mkdir -p "$OUT"
MAXLEN=20   # seconds; long loops cost bandwidth and nobody watches a background that long
VF="scale='min(1920,iw)':-2,fps=30"
VFM="scale='min(960,iw)':-2,fps=30"

echo "→ Desktop MP4 (H.264)"
ffmpeg -y -loglevel error -i "$IN" -map 0:v:0 -t $MAXLEN -an -dn -map_metadata -1 -vf "$VF" -c:v libx264 -preset $PRESET -crf 26 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/hero-woodworking.mp4"
echo "→ Desktop WebM (VP9)"
ffmpeg -y -loglevel error -i "$IN" -map 0:v:0 -t $MAXLEN -an -dn -map_metadata -1 -vf "$VF" -c:v libvpx-vp9 -b:v 0 -crf 36 \
  -deadline $DEADLINE -cpu-used $CPU -row-mt 1 "$OUT/hero-woodworking.webm"
echo "→ Mobile MP4 (960px)"
ffmpeg -y -loglevel error -i "$IN" -map 0:v:0 -t $MAXLEN -an -dn -map_metadata -1 -vf "$VFM" -c:v libx264 -preset $PRESET -crf 28 \
  -profile:v main -pix_fmt yuv420p -movflags +faststart "$OUT/hero-woodworking-mobile.mp4"

# Keep the WebM only if it actually beats the MP4 (fast VP9 encodes sometimes don't).
size() { stat -c%s "$1" 2>/dev/null || stat -f%z "$1"; }
if (( $(size "$OUT/hero-woodworking.webm") >= $(size "$OUT/hero-woodworking.mp4") )); then
  rm "$OUT/hero-woodworking.webm"
  echo "  (WebM was not smaller than the MP4, so it was removed — browsers will use the MP4.)"
fi
for f in "$OUT"/hero-woodworking*.{mp4,webm}; do
  [[ -f "$f" ]] || continue
  if (( $(size "$f") > 6000000 )); then
    echo "  ⚠ $(basename "$f") is over 6 MB. Try a shorter clip, or re-run with --best."
  fi
done
ls -lh "$OUT"/hero-woodworking*
echo "Done. Rebuild or restart the dev server to pick up the video."
