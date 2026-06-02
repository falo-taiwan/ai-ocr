# Privacy and Local Key

Falo x Force Cheng  
Public release: 2026-05-20

## API Key Rule

Never hard-code an API key in public source code.

Use one of these patterns:

```text
Browser demo: paste key locally in the page
Python demo: read GEMINI_API_KEY from environment
cURL demo: read GEMINI_API_KEY from environment
```

## Public Demo Rule

Public demos should use neutral, synthetic A4 examples.

Do not upload or commit:

- Real personal records
- Private business documents
- Customer information
- Internal operation workflows
- API keys

## Local Browser Demo

The browser example in this repo keeps the key in the current page session by default. It does not require a backend server.

If you add localStorage persistence later, add a visible clear-key button and explain where the key is stored.

## Human Review

AI output should remain a draft until reviewed.

Recommended status values:

```text
draft
needs_review
human_confirmed
finalized
```

