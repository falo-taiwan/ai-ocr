#!/usr/bin/env python3
"""Call Gemini vision models with a local file.

No API key is stored in this script. Use GEMINI_API_KEY.
"""

from __future__ import annotations

import base64
import json
import mimetypes
import os
import sys
import urllib.request
from pathlib import Path


PROMPT = """Read this neutral A4 document and return only valid JSON.
Do not use Markdown.
Use empty strings for unclear fields.
Include review_flags for uncertainty."""


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: GEMINI_API_KEY=... python3 gemini_ocr.py /path/to/a4-image.webp [model]")
        return 2

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        print("Missing GEMINI_API_KEY", file=sys.stderr)
        return 2

    path = Path(argv[1]).expanduser()
    model = argv[2] if len(argv) > 2 else "gemini-3.1-flash-lite"
    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        return 2

    mime_type = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    image_b64 = base64.b64encode(path.read_bytes()).decode("utf-8")
    payload = {
        "contents": [{
            "parts": [
                {
                    "inline_data": {
                        "mime_type": mime_type,
                        "data": image_b64,
                    }
                },
                {"text": PROMPT},
            ]
        }],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0,
        },
    }

    data = json.dumps(payload).encode("utf-8")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
    )
    with urllib.request.urlopen(req, timeout=60) as response:
        print(response.read().decode("utf-8"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

