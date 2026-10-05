---
name: test-report-detailed
description: Run the frontend Jest tests and save a detailed, stakeholder-style test report as a Markdown file. Use only when the user asks for a detailed, full, or stakeholder test report.
---

# Detailed test report

Run the tests, then write a report exactly as described in **Report settings** below.
Never change application source code while doing this — only report.

## How to run

1. From the `frontend/` folder, run:
   `npx jest --json --outputFile="$TMPDIR/jest-results.json" --silent`
   (A non-zero exit code just means some tests failed — still write the report.)
2. Read `$TMPDIR/jest-results.json` for the results. Do not generate a coverage folder.
3. Map each test file to its requirement using the `RQxx` prefix in the file name
   (e.g. `RQ02_select_genres.test.tsx` → RQ2). Look up each requirement's wording
   in the root `README.md`. `it.todo` entries are "Not implemented yet".

---

## Report settings  ✏️ (edit this section to change the report)

**Where:** save the report to `test-report.md` in the repo root (overwrite it each run),
then tell the user in one line where it is and the overall verdict.

**Language:** English

**Sections, in this order:**

1. **Header** — title "BetterThanIMDB — Test Report", the date and time, and the git branch.
2. **Verdict** — a large line: 🟢 READY (no failures) or 🔴 NOT READY (any failure).
3. **Pass rate** — the percentage of passed tests (ignore todos), shown as a text bar,
   e.g. `█████████░ 97.7% (43/44)`.
4. **Requirement checklist** — one section per requirement (RQ1 … RQ15), with:
   - the requirement text from the README,
   - every test for it as a checkbox: `- [x]` passed, `- [ ]` failed,
   - "⏳ Not implemented yet" if it only has todos.
5. **Failure analysis** — for each failing test: what was expected, what actually
   happened, and the likely cause, in 2–3 sentences.
6. **Tests outside the requirements** — tests whose file has no `RQxx` prefix, listed the same way.

**Style:** formal and complete, suitable to share with a manager or client.
