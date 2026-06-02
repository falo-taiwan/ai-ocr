# Gemini 3.5 OCR Lab

Falo x Force Cheng  
Public knowledge release: 2026-05-20  
Project type: Gemini Vision OCR calling guide and image strategy lab

Public page:

```text
https://falo-taiwan.github.io/gemini35-ocr/
```

## What This Repo Is

This repo explains how to call Gemini vision models for OCR-like document understanding, with a practical image-preprocessing strategy for full-page A4 documents.

The focus is neutral public education:

- How to call Gemini image understanding APIs.
- How to choose between lightweight and stronger Gemini models.
- How to prepare full-page A4 images before sending them to an API.
- How to keep API keys local and avoid hard-coding secrets.
- How to structure JSON output for human review.

This repo intentionally uses generic examples such as class handouts, registration forms, warranty cards, workshop worksheets, and meeting sign-in sheets.

## What This Repo Does Not Cover

To keep the public version clean and reusable, this repo does not discuss private business workflows, proprietary internal systems, regulated record pipelines, or domain-specific commercial implementations.

## Recommended Models

Primary recommended route:

```text
Low-cost main route: gemini-3.1-flash-lite
Stronger review route: gemini-3.5-flash
```

Optional baseline route:

```text
Legacy comparison baseline: gemini-2.5-flash
Lowest-cost older lite baseline: gemini-2.5-flash-lite
```

The practical pattern is:

```text
A4 full-page image
-> browser-side image optimization
-> Gemini 3.1 Flash-Lite draft
-> optional Gemini 3.5 Flash review
-> human check
-> final JSON / CSV / Markdown output
```

## Image Strategy

Default public strategy:

```text
Format: WebP
MIME type: image/webp
Max long side: 768 px for low-cost OCR trial
Quality: 0.85
Upscaling: no
Processing location: browser Canvas, local only
```

For A4 full-page documents, 768 px is useful for quick low-cost extraction tests. If the page has tiny text, tables, dense handwriting, or stamps, use a higher long-side target such as 1200, 1600, or 2048 px and record the chosen strategy.

## Quick Start

### Browser Fetch Example

Open:

```text
examples/browser-fetch/index.html
```

Paste a Gemini API key locally in the browser, choose a model, upload an A4 demo image, and run the request.

### Python Example

```bash
cd examples/python-urllib
GEMINI_API_KEY="your-key" python3 gemini_ocr.py ../../samples/a4-demo/a4-demo-text.md
```

For image tests, pass a local `.jpg`, `.png`, or `.webp` file.

### cURL Example

```bash
cd examples/curl
GEMINI_API_KEY="your-key" ./gemini_ocr.sh /path/to/a4-image.webp gemini-3.1-flash-lite
```

## Public Declaration

```text
Brand: Falo x Force Cheng
Release date: 2026-05-20
Location context: Kaohsiung, Taiwan
Language: Traditional Chinese / English technical notes
Topic: Gemini OCR, image understanding, browser-side image optimization
Public scope: education, developer guide, neutral A4 document examples
```

## Docs

- [Model Calling Guide](docs/model-calling-guide.md)
- [Image Strategy](docs/image-strategy.md)
- [A4 Full-Page Example](docs/a4-full-page-example.md)
- [Privacy and Local Key](docs/privacy-and-local-key.md)
- [Changelog](docs/changelog.md)

## Source References

Official Google AI docs used for this public guide:

- Gemini 3.1 Flash-Lite model page: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite
- Gemini 3.5 Flash model page: https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash
- Gemini image understanding guide: https://ai.google.dev/gemini-api/docs/image-understanding
