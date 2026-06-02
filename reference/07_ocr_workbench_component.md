# FALO OCR Workbench Component Design

## 1. Core Positioning

FALO OCR Workbench is an independent data-conversion component.

It is not a side panel inside FALO Prompt Manager. It is a standalone `ocr.html` tool that can be opened by Prompt Manager, installed as a PWA, and reused later by Chrome Extension, GAS, or other FALO tools.

Short version:

> Prompt Manager manages Prompt Assets.  
> OCR Workbench turns images into editable text.  
> The current integration is: Prompt Manager opens OCR Workbench.

## 2. Product Boundary

### FALO Prompt Manager `index.html`

The main page should only keep:

- OCR entry button
- Short explanation

It should not contain:

- Gemini API key field
- OCR prompt template editor
- OCR result editor
- OCR template import/export
- image upload UI

### FALO OCR Workbench `ocr.html`

The OCR page owns:

- image/file input
- image preview
- OCR operation prompt selection
- editable OCR operation prompt
- OCR result text area
- copy result button
- OCR prompt template import/export
- restore default template button
- PWA install button

## 3. OCR Prompt Meaning

OCR Prompt here means the operation prompt sent together with the image.

It is not an OCR post-processing prompt.

The mental model is:

```text
image / screenshot / handwritten note
        +
OCR operation prompt
        ↓
Gemini OCR or external OCR tool
        ↓
editable text result
        ↓
copy back to Prompt Manager or other workflow
```

In v0.3, Gemini OCR execution is still reserved. The UI teaches and prepares the structure, but does not yet consume API credits.

## 4. Default OCR Operation Prompts

The first version should provide five built-in templates:

1. General document OCR
2. Table / form OCR
3. Handwritten note OCR
4. Historical document OCR
5. Receipt / evidence OCR

These prompts should control how the OCR model reads the image:

- preserve layout or not
- mark uncertain text
- extract table structure
- avoid hallucinating missing content
- output plain text or JSON-like structure

## 5. Output Behavior

OCR output should be simple:

- one large editable text area
- copy result button
- optional clear button

The first version should not build a complex post-processing workflow. Users can copy the result back to Prompt Manager, ChatGPT, Gemini, NotebookLM, or another FALO tool.

## 6. Template Import / Export: Excel Mode

OCR prompt templates should use an Excel-friendly table format.

Recommended CSV columns:

```text
id,title,description,prompt,outputFormat,useCase,status
```

Workflow:

```text
Export CSV template
    ↓
Edit in Excel / Google Sheets
    ↓
Import CSV
    ↓
Full overwrite OCR template list
```

This is intentionally a full overwrite loop, not a merge system.

Why:

- easier to teach
- easier to audit
- avoids complex conflict resolution
- matches spreadsheet thinking

## 7. PWA Strategy

`ocr.html` should be installable as a lightweight PWA component.

For v0.3:

- create `ocr.html`
- create `ocr-manifest.webmanifest`
- register the shared `service-worker.js`
- add `ocr.html` and `ocr-manifest.webmanifest` to the service worker app shell

Prompt Manager can still use its own `manifest.webmanifest`.

## 8. Current v0.3 Implementation Scope

Do now:

- `ocr.html`
- PWA install button
- image/file preview
- five OCR operation prompts
- load selected preset into editable prompt textarea
- editable OCR result textarea
- copy result
- export CSV template
- import CSV template with full overwrite
- restore default templates
- Prompt Manager opens `ocr.html`

Do not do yet:

- real Gemini API call
- API key vault
- billing / token tracking
- batch OCR
- marketplace
- complex template merge
- OCR post-processing workflow engine

## 9. Teaching Sentence

> OCR Workbench is a standalone FALO data-conversion component: image plus OCR operation prompt becomes editable text; templates use an Excel-style full overwrite loop.
