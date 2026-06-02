#!/usr/bin/env bash
set -euo pipefail

IMAGE_PATH="${1:-}"
MODEL="${2:-gemini-3.1-flash-lite}"

if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "Missing GEMINI_API_KEY" >&2
  exit 1
fi

if [[ -z "$IMAGE_PATH" || ! -f "$IMAGE_PATH" ]]; then
  echo "Usage: GEMINI_API_KEY=... ./gemini_ocr.sh /path/to/a4-image.webp [model]" >&2
  exit 1
fi

case "${IMAGE_PATH,,}" in
  *.webp) MIME_TYPE="image/webp" ;;
  *.png) MIME_TYPE="image/png" ;;
  *.jpg|*.jpeg) MIME_TYPE="image/jpeg" ;;
  *) MIME_TYPE="image/jpeg" ;;
esac

if [[ "$(uname)" == "Darwin" ]]; then
  IMAGE_B64="$(base64 -b 0 "$IMAGE_PATH")"
else
  IMAGE_B64="$(base64 -w0 "$IMAGE_PATH")"
fi

curl "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d @- <<JSON
{
  "contents": [{
    "parts": [
      {
        "inline_data": {
          "mime_type": "${MIME_TYPE}",
          "data": "${IMAGE_B64}"
        }
      },
      {
        "text": "Read this neutral A4 document and return only valid JSON. Do not use Markdown. Use empty strings for unclear fields and include review_flags."
      }
    ]
  }],
  "generationConfig": {
    "responseMimeType": "application/json",
    "temperature": 0
  }
}
JSON

