# A4 Full-Page Example

Falo x Force Cheng  
Public release: 2026-05-20

## Scenario

Use a neutral A4 page, such as a workshop sign-in sheet or class handout.

Avoid using private business documents, regulated records, or real personal data in public demos.

## Example A4 Content

```text
Community Workshop Registration Sheet

Event: AI Reading Practice
Date: 2026-05-20
Location: Kaohsiung Learning Studio

Participant Name | Organization | Email | Notes
Alex Lin | Demo School | alex@example.com | vegetarian meal
Jamie Wu | Local Studio | jamie@example.com | needs printed copy
Sam Chen | Open Lab | sam@example.com | first-time attendee

Reminder:
Please arrive 10 minutes early.
Bring your laptop and charger.
```

## Suggested Extraction Schema

```json
{
  "document_title": "",
  "event_name": "",
  "date": "",
  "location": "",
  "participants": [
    {
      "name": "",
      "organization": "",
      "email": "",
      "notes": ""
    }
  ],
  "reminders": [],
  "review_flags": []
}
```

## Prompt

```text
Read this A4 page and return only valid JSON.
Do not include Markdown fences.
If a table cell is unclear, use an empty string and add a review flag.
Preserve visible text, but do not invent missing values.
```

