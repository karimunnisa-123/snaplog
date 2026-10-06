---
doc: scope
status: draft
---

# SnapLog

A tiny terminal work logger for developers and busy people who want a fast, plain-text record of what they did during the day.

## The Unique Kernel
SnapLog is a zero-friction daily memory aid: one quick command to log a moment, and one quick command to view the last few hours or past 7 days. The distinctive value is that it stays in the terminal, writes to a plain text file the user owns, and feels instant enough to use without a context switch.

## Who It's For
A developer or knowledge worker who is already in the terminal, forgets what they did during the day, and needs a lightweight log for standups, weekly reviews, or timesheets. They want something they can use in seconds without configuring accounts, opening editors, or learning a complicated syntax.

## The Core Loop
The user is already in the terminal at the end of a workday or during a quick check-in. They type a short message with the `snap` command, and it appends a timestamped line to a local log file. Later, they run `snap today` or `snap week` to read back the relevant entries and reconstruct the day or week without relying on memory alone.

## Inspiration & Identity
The project should feel fast, calm, and uncomplicated. It should be terminal-native, not a web app or dashboard. The identity is: simple CLI, plain text storage, no sign-in, no setup friction, and no extra features beyond the core logging workflow.

## Why This Matters to the Learner
This is a practical tool I actually want to use. I want something I can rely on for standups and weekly reviews without adding more friction to my workday. The main value is that I can capture what happened as it happens and read it back later without reconstructing it from memory.

## What "Working" Looks Like
The proof of concept is complete when a user can:
- type `snap "finished the login page"` and see a confirmation that it was logged;
- run `snap today` and get the entries from the current date with timestamps;
- run `snap week` and get entries from the last 7 days;
- handle empty log cases, missing files, and no entries today with a friendly message instead of a crash.

The strongest demo moment is a short sequence: log a couple of entries, then immediately read them back with `snap today` and know exactly what happened that day.

## The POC Boundary
In scope:
- logging one text entry at a time;
- storing entries in a single plain text file;
- reading entries by current day or last 7 days;
- clean, friendly handling for empty or missing data.

Not in scope:
- editing or deleting entries;
- tags, categories, or metadata;
- accounts, sync, or remote storage;
- web UI or database;
- anything beyond the core logging and read-back workflow.

## Later
- nicer output formatting or sort order improvements;
- optional configuration for alternate log paths;
- extra viewer commands or report summaries.

## Explicitly Cut
- No editing or deleting log entries, because the tool is intentionally simple and not a full journal system.
- No tags, filters, or categorization, because the main job is fast daily tracking without added complexity.
- No accounts, servers, or sync, because the user wants a local tool that works without setup or configuration.
- No database or web app, because this is a small CLI project designed for a beginner-friendly proof of concept.
