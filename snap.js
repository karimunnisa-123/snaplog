#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_PATH = path.join(os.homedir(), '.snaplog.txt');

function formatTimestamp(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
}

function parseEntry(line) {
  const separatorIndex = line.indexOf('\t');
  if (separatorIndex === -1) {
    return null;
  }

  const timestamp = Number(line.slice(0, separatorIndex));
  const message = line.slice(separatorIndex + 1).trim();

  if (!Number.isFinite(timestamp) || !message) {
    return null;
  }

  return {
    timestamp,
    message,
    date: new Date(timestamp),
  };
}

function readEntries() {
  if (!fs.existsSync(LOG_PATH)) {
    return [];
  }

  const text = fs.readFileSync(LOG_PATH, 'utf8');
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseEntry)
    .filter(Boolean);
}

function appendEntry(message) {
  const entry = `${Date.now()}\t${message}\n`;
  fs.appendFileSync(LOG_PATH, entry, 'utf8');
}

function sameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function printEntries(entries) {
  if (entries.length === 0) {
    return false;
  }

  entries.forEach(({ message, timestamp }) => {
    console.log(`${formatTimestamp(new Date(timestamp))}   ${message}`);
  });

  return true;
}

function commandLog(message) {
  if (!message || !message.trim()) {
    console.log('Usage: snap "what you did"');
    process.exitCode = 1;
    return;
  }

  appendEntry(message.trim());
  console.log(`Logged: ${message.trim()}`);
}

function commandToday() {
  const now = new Date();
  const entries = readEntries().filter(({ date }) => sameDay(date, now));

  if (!printEntries(entries)) {
    console.log('Nothing logged today.');
  }
}

function commandWeek() {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const entries = readEntries().filter(({ timestamp }) => timestamp >= sevenDaysAgo && timestamp <= now);

  if (!printEntries(entries)) {
    console.log('Nothing logged in the last 7 days.');
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: snap "what you did"\n       snap today\n       snap week');
    process.exitCode = 1;
    return;
  }

  const [command, ...rest] = args;
  const message = rest.join(' ');

  if (command === 'today') {
    commandToday();
    return;
  }

  if (command === 'week') {
    commandWeek();
    return;
  }

  commandLog(message || command);
}

main();
