# SnapLog

SnapLog is a tiny terminal work logger for developers and anyone who wants a plain-text record of what they did during the day.

## Usage

```bash
snap "fixed the login redirect bug"
snap today
snap week
```

## Behavior

- `snap "your note"` appends a timestamped entry to `~/.snaplog.txt`
- `snap today` shows entries from the current day
- `snap week` shows entries from the past 7 days
- missing files and empty results show friendly messages instead of crashing

## Local setup

```bash
npm link
```

Then the `snap` command is available in your terminal.
