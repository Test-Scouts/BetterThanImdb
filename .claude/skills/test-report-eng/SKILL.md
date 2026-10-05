---
name: test-report-eng
description: Run the frontend Jest tests and open an English test report in the web browser. Use when the user asks to run the tests or for a test report in English.
---

# Test report (English)

Run the tests, build an HTML report exactly as described in **Report settings** below,
and open it in the web browser. Never change application source code while doing this — only report.

## How to run

1. From the `frontend/` folder, run:
   `npx jest --json --outputFile="$TMPDIR/jest-results.json" --silent`
   (A non-zero exit code just means some tests failed — still write the report.)
2. Read `$TMPDIR/jest-results.json` for the results. Do not generate a coverage folder.
3. Map each test file to its requirement using the `RQxx` prefix in the file name
   (e.g. `RQ02_select_genres.test.tsx` → RQ2). `it.todo` entries are "Not implemented yet".
4. Write the report as one self-contained HTML file (inline CSS, no external files)
   to `test-reports/report-eng.html` in the repo root, overwriting it each run.
5. Open it with `open test-reports/report-eng.html`. In the chat, reply with only one line:
   the overall result and the file path. Do not repeat the report in the chat.

---

## Report settings  ✏️ (edit this section to change the report)

**Language:** English

**Page title:** "BetterThanIMDB — Test Report"

**Sections, in this order:**

1. **Summary** — one line: total / passed / failed / todo, and the run time.
2. **Results by requirement** — a table:
   | Requirement | Status | Passed | Failed |
   Status is ✅ (all pass), ❌ (any fail) or ⏳ (todo only).
3. **Failures** — for each failing test: the test name, the file, and a one-sentence
   plain-English reason. No stack traces.
4. **Not implemented yet** — a bullet list of the todo requirements.

**Look:** clean and simple; white background, readable font, green for passed,
red for failed, grey for todo.

**Style:** short, no jargon, no extra commentary or suggestions unless a test failed.
