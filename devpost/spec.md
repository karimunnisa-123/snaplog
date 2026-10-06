---
doc: spec
status: approved
---

# SnapLog — Technical Spec

## How This Works, In Plain Language
SnapLog is a tiny Node.js command-line app. It uses one plain-text file at `~/.snaplog.txt` as its storage. The user runs a terminal command, and the app either appends a new entry or reads the file and filters it by date.

The app has three behavior paths:
- log an entry: write a timestamped line to the file
- show today: read the file and print entries from the current date
- show week: read the file and print entries from the last 7 days

The whole project is intentionally minimal. There is no database, no account system, no web server, and no dependency library. The goal is to keep the behavior clear, fast, and easy to understand.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

The user runs a command like `snap "fixed the login redirect bug"`.
- The CLI receives the text argument.
- The app builds a timestamp at runtime.
- It appends a formatted line to `~/.snaplog.txt`.
- It prints a simple confirmation like `Logged: fixed the login redirect bug`.

Later, the user runs `snap today`.
- The CLI reads the log file.
- It filters entries to those from the current date.
- It prints them in a readable timestamped format.
- If there are no matches, it prints `Nothing logged today.`

Later, the user runs `snap week`.
- The CLI reads the log file.
- It filters entries from the prior 7 days.
- It prints matching entries in order.
- If there are no matches, it prints `Nothing logged in the last 7 days.`

## Stack
- Language: Node.js
- Runtime: local terminal/CLI only
- Dependencies: zero external dependencies
- Rationale: the learner explicitly wants a small, beginner-friendly tool with no database, no accounts, and no UI. A minimal Node.js CLI is the best fit for the proof of concept and keeps the learning curve low.
- Versioning: use the current stable Node version available locally; no framework or package manager install burden beyond standard Node runtime setup.

## Where It Runs and How Someone Tries It
This app runs locally on the user’s machine as a command-line tool. It does not need a browser, server, or remote host.

How to try it:
1. Open a terminal in the project folder.
2. Run the CLI entry command, e.g. `node snap.js "finished the login page"` during development.
3. Run `node snap.js today` and `node snap.js week` to verify the read-back behavior.
4. For the final demo, show a short sequence: log a few entries, then run the `today` and `week` commands.

Deployment is optional and not required for this project. The required public GitHub repo and demo video are for shipping, not for the basic app to work locally.

## Look and Feel
This is a terminal-first product, so the visual design is minimal and text-oriented.
- Output should be plain, readable, and easy to scan in a terminal.
- Confirmation messages should be short and human-friendly.
- Empty states should be direct and calm, not alarming or technical.
- There is no web styling or UI layer to preserve; the focus is on terminal output clarity.

## Components

### CLI entry
Responsible for parsing the command-line arguments and dispatching to one of the three functions: log, today, or week.
PRD ref: `prd.md > Features and Behavior`

### Log writer
Responsible for appending a new timestamped entry to `~/.snaplog.txt`.
PRD ref: `prd.md > Features and Behavior > Logging a work entry`

### Reader and filter
Responsible for opening the log file, filtering entries by date range, and printing them in a readable terminal format.
PRD ref: `prd.md > Features and Behavior > Reading entries for today`, `prd.md > Features and Behavior > Reading entries for the last 7 days`

### Empty-state handler
Responsible for displaying friendly messages when there are no entries or when the log file is missing.
PRD ref: `prd.md > Features and Behavior > Empty and missing-file states`

## Data Model
The data model is intentionally simple:
- one text file
- one line per entry
- each line contains: timestamp + message

Example line:
`2026-10-06T19:00:12-04:00 | fixed the login redirect bug`

Rules:
- write new entries as append-only lines
- read entries only for the requested window
- no support for editing, deleting, or tagging
- no metadata beyond timestamp and text content

## File Structure
```text
project/
├── snap.js              # CLI entry point
├── package.json         # npm metadata and bin command
├── README.md            # quick usage instructions
├── devpost/             # planning docs for the hackathon
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   ├── spec.md
│   └── app-map.html    # optional later, if needed for wrap-up
└── .gitignore           # excludes local learner profile if desired
```

This keeps the implementation understandable for a beginner. The app is small enough to live in a single file or a very small set of files without extra abstraction.

## External Services and Dependencies
None required for the proof of concept.
- No database
- No auth service
- No cloud storage
- No API calls
- No hosted deployment required

The only external dependency is the local Node.js runtime itself.

## Important Failure Modes
- **Log file missing** → create the file if needed and continue, or show a friendly message that the log is empty.
- **No entries today** → print `Nothing logged today.`
- **No entries in the last 7 days** → print `Nothing logged in the last 7 days.`
- **Bad or missing input for the log command** → show a usage message and exit without crashing.

## What Was Simplified and Why
- **Single local file instead of a database** — because the learner wants a plain-text file and a zero-dependency proof of concept.
- **No editing or deletion** — because the scope explicitly excludes these features and they are not needed to prove the value.
- **No sync or accounts** — because the core need is a friction-free local habit, not a shared system.
- **No deployment requirement** — because the product is a terminal tool and the demo can be recorded locally.

## Decisions and Open Issues
Decisions made here:
- Node.js CLI with zero dependencies is the chosen architecture.
- Storage will be a plain text file at `~/.snaplog.txt`.
- The product will support exactly three commands: log, today, and week.
- Empty and missing-file states are handled gracefully and without crashes.
- The project is intentionally scoped to a small proof of concept and not a broader work-tracking product.

Uncertainty discussed and resolved:
- The learner did not identify a technical uncertainty that requires a separate investigation; the app is sufficiently clear for implementation.
- No unresolved product questions remain before building.
