---
doc: prd
status: draft
---

# SnapLog — Product Requirements

SnapLog is a small terminal-first work logger for developers and anyone who needs a quick, plain-text record of their day without leaving the command line. It is built for fast daily logging and simple read-back by day or week, with no account setup or extra tooling.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`

## The Core Journey
1. The user is already in the terminal at the end of a workday or during a quick check-in.
2. They type a short command in the form `snap "what you did"`.
3. The tool appends a timestamped line to a single local log file at `~/.snaplog.txt`.
4. The terminal responds with a short confirmation such as `Logged: fixed the login redirect bug`.
5. Later, the user runs `snap today` to see the entries from the current date with timestamps.
6. At the end of the week, they run `snap week` to see entries from the last 7 days.
7. If there are no entries, the tool shows a clear, friendly message like `Nothing logged today.` instead of crashing.
8. If the file is missing, it also uses a friendly, non-fatal message so the user can still use the tool without confusion.

This is the full proof-of-concept journey: log a sentence, then read it back quickly and reliably.

## Screens and Layout
This is a non-visual, terminal-only product. The interaction surface is the command line itself. There are no windows, pages, or UI screens. The product is defined by three commands and the output they produce in the terminal.

## Look and Feel
The interface should feel fast, plain, and unintrusive. The output should be readable in a terminal, with minimal decoration and no extra instructions required. It should feel like a simple habit, not a tool with a learning curve. The tone is direct and helpful rather than playful or oversized.

## Features and Behavior

### Logging a work entry
The user types `snap "what you did"`.
- The command accepts a single text string.
- It writes a timestamped line to the local file at `~/.snaplog.txt`.
- The tool immediately confirms success with a short message in the terminal.
- The output must be easy to scan and quick to type.

- As a developer or busy worker, I want to log a short task snapshot in under two seconds so that I do not interrupt my flow.
  - [ ] Acceptance criterion — entering a log entry writes it to the local file and the terminal shows a success confirmation.
  - [ ] Acceptance criterion — the action does not open an editor, require a browser, or ask for sign-in.

### Reading entries for today
The user types `snap today`.
- The tool reads the log file and prints only entries from the current day.
- Each line includes a timestamp and the entry text.
- If there are no entries for today, the output is a friendly empty-state message.

- As a user who needs a standup summary, I want to see what happened today so that I can answer without guessing.
  - [ ] Acceptance criterion — the command shows only the entries from the current date.
  - [ ] Acceptance criterion — the output includes a timestamp for each entry.
  - [ ] Acceptance criterion — when there are no entries, the tool shows `Nothing logged today.`

### Reading entries for the last 7 days
The user types `snap week`.
- The tool reads the log file and prints entries from the previous 7-day window.
- Entries may include multiple days in the output.
- The command is designed to help with weekly reviews or a brief recap of recent work.

- As a user preparing a weekly review, I want to see the last seven days of work so that I can reconstruct recent activity without memory alone.
  - [ ] Acceptance criterion — the output includes entries from the previous 7 days.
  - [ ] Acceptance criterion — older entries outside that window are excluded.

### Empty and missing-file states
The tool must fail gracefully.
- If the log file does not exist, it should not crash or print a stack trace.
- If there are no entries matching the query, it should show a friendly message.
- The tool must remain usable without additional setup or error recovery steps.

- As a user with no prior history, I want the app to be forgiving in the empty state so that I can keep using it without confusion.
  - [ ] Acceptance criterion — missing log file yields a friendly message rather than a crash.
  - [ ] Acceptance criterion — no entries today yields `Nothing logged today.`
  - [ ] Acceptance criterion — no entries in the last 7 days yields `Nothing logged in the last 7 days.`

## States and Boundaries
- **First use / clean state** — there is no file yet; the user can still run the command, and the tool begins creating the log file as needed.
- **Normal logging state** — entries append to the log file with timestamps and the tool confirms success in the terminal.
- **Empty state** — `snap today` or `snap week` returns a user-friendly message when there are no results.
- **Missing log file state** — the command handles a missing file gracefully instead of crashing.
- **Persistence boundary** — the log persists on the local machine in a plain text file, not in memory or a remote service.

## Product Decisions
- `~/.snaplog.txt` as the storage location — chosen because it keeps the tool simple, local, and easy to use without a config file or setup step.
- Three commands only — chosen to keep the tool minimal and aligned with the learner’s stated scope: `snap`, `snap today`, and `snap week`.
- Zero dependencies — chosen because the learner specifically wants a Node.js CLI with no external libraries and no complexity.
- No editing or deleting from the CLI — chosen to keep the project focused on logging and read-back, not journaling or admin features.

## What We're Building
The proof of concept will include:
- one command for adding a log entry;
- one command for viewing entries from today;
- one command for viewing entries from the last 7 days;
- local plain-text storage at `~/.snaplog.txt`;
- reliable empty and missing-file behavior;
- no extra features beyond the logging workflow.

## Deferred From the POC
- User accounts or sign-in.
- Syncing across devices.
- Editing or deleting entries after they are logged.
- Tags, search, or filtering by category.
- Desktop or web UI.
- Anything beyond the three-command CLI workflow.

## Possible Later Enhancements
- A configurable log file path.
- Cleaner formatting for daily or weekly summaries.
- More readable terminal output for long entries.

## Non-Goals
- No database, because the product is intentionally simple and local.
- No web app, because the core need is a fast terminal habit.
- No authentication or cloud storage, because the user explicitly wants a local, no-friction tool.
- No extra commands beyond the three required behaviors.

## Open Questions
- None that affect the proof of concept before implementation. The main behavior and scope are already explicit and stable.
