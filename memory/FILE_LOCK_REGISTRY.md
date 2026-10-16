# FILE LOCK REGISTRY
# File: f:\videosystem\.agents\memory\FILE_LOCK_REGISTRY.md
# Keeper: All agents (update when starting/finishing file work)
# Purpose: Prevent 2 agents editing the same file at the same time

> Check this BEFORE writing to any file.
> If the file is locked by another agent → WAIT or message Boss.
> Locks expire after 30 minutes if not updated.

---

## CURRENT LOCKS

| File Path | Locked By | Since | Expected Release |
|---|---|---|---|
| (no active locks) | — | — | — |

---

## HOW TO ADD A LOCK
When you start writing a file, add a row to the table above:
`| store-app/public/style.css | Pam Beesly | 2026-10-03 17:30 | 18:00 |`

## HOW TO RELEASE A LOCK
When you finish, remove your row from the table or replace it with "(no active locks)".

## IF LOCK IS EXPIRED (> 30 min old)
Message Boss immediately. Boss confirms if agent finished or needs help.
Do NOT assume the lock is free without Boss confirmation.
