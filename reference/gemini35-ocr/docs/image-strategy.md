# Image Strategy

Falo x Force Cheng  
Public release: 2026-05-20

## Core Idea

For OCR-like document understanding, image preparation matters as much as the prompt.

The public default is:

```text
Input: local image file
Preprocess: browser Canvas
Output: WebP
Max long side: 768 px
Quality: 0.85
Upscale: no
```

This is a low-cost default for clear A4 pages. It is not a universal best setting.

## Why WebP

WebP is a practical browser-native format for API-bound images:

- Smaller than PNG for many document photos.
- Often smaller than JPEG at similar readability.
- Supported by Gemini image input.
- Easy to generate with `canvas.toBlob("image/webp", 0.85)`.

## Why 768 px

Gemini image input uses tiled image processing. The official image guide explains that small images can cost fewer tokens, while larger images are split into 768 x 768 tiles.

In practice:

- 768 px long side is useful for quick low-cost A4 trials.
- 1200-1600 px is often safer for dense text.
- 2048 px can be useful for small text, handwritten notes, or complex page layout.

## Recommended Presets

| Preset | Format | Long Side | Quality | Use Case |
|---|---:|---:|---:|---|
| Trial | WebP | 768 | 0.85 | Quick extraction, low cost |
| Balanced | WebP | 1280 | 0.88 | General A4 documents |
| Detail | WebP | 1600 | 0.9 | Smaller text or tables |
| Archive evidence | Original | unchanged | unchanged | Keep source image unchanged |

## Metadata to Record

Always record both the source image and sent image.

```json
{
  "source_image": {
    "name": "a4-demo.jpg",
    "mime_type": "image/jpeg",
    "width": 3024,
    "height": 4032,
    "size_bytes": 1840000
  },
  "sent_image": {
    "mime_type": "image/webp",
    "width": 576,
    "height": 768,
    "size_bytes": 155000,
    "strategy": "webp_long_side_768_quality_085",
    "quality": 0.85,
    "upscaled": false
  }
}
```

This makes later accuracy analysis possible.

