# SnapLog

A terminal work logger. Type one line about what you just did, and SnapLog timestamps it. Later, ask it what you did today or this week.

## Why

You finish a day of work and can't remember what you actually did. Standup is in five minutes and you're reconstructing it from memory. SnapLog captures it the moment it happens — one command, no editor, no context switch.

## Install

Requires Node.js.

```bash
git clone https://github.com/YOUR-USERNAME/SnapLog.git
cd SnapLog
npm link

##Use
snap "fixed the login redirect bug"   # log an entry
snap today                            # show today's entries
snap week                             # show the last 7 days
