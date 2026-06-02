# Model Calling Guide

Falo x Force Cheng  
Public release: 2026-05-20

## Purpose

This guide shows how to call Gemini vision-capable models for OCR-like document understanding.

The examples are intentionally generic. Use them for neutral A4 documents such as:

- Class handouts
- Workshop worksheets
- Registration forms
- Warranty cards
- Meeting sign-in sheets
- Printed notices

## Recommended Model Roles

| Role | Model | Suggested Use |
|---|---|---|
| Main low-cost route | `gemini-3.1-flash-lite` | First draft for clear A4 images |
| Stronger review route | `gemini-3.5-flash` | Second pass when text is dense or results conflict |
| Baseline comparison | `gemini-2.5-flash` | Compare older route with newer lite model |
| Older lite baseline | `gemini-2.5-flash-lite` | Lowest-cost historical comparison |

## Request Shape

Use `generateContent` with one image part and one text prompt.

Recommended order:

```text
image part
text prompt
```

The prompt should ask for:

- Plain JSON only
- No Markdown fences
- Empty string for unreadable fields
- `review_flags` for uncertain fields
- Human review before final use

## JSON Prompt Template

```text
You are an OCR-oriented document understanding assistant.
Read the uploaded A4 document image and return only valid JSON.

Rules:
- Do not wrap the result in Markdown.
- Do not guess unclear values.
- Use empty string for unreadable text.
- Use review_flags for uncertainty.
- Preserve the visible text as much as possible.

Return this JSON shape:
{
  "document_title": "",
  "document_type": "",
  "date": "",
  "main_name": "",
  "organization": "",
  "contact": "",
  "items": [],
  "notes": "",
  "review_flags": []
}
```

## JavaScript Fetch Pattern

```javascript
async function callGeminiVision({ apiKey, model, base64Image, mimeType, prompt }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Image
            }
          },
          { text: prompt }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0
      }
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
```

## Human Review Boundary

Model output should be treated as a draft.

Recommended states:

```text
uploaded
-> optimized_image_ready
-> ai_draft
-> human_reviewed
-> finalized
```

Do not treat AI output as final until a human has reviewed it.

