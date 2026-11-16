# boilerplate

## Uptime monitors

Set up two Better Stack monitors per muse. Email alerts only — no Slack, no paging.

| Monitor | URL | Check interval | Alert threshold |
|---|---|---|---|
| Landing page | `https://<domain>/` | 3 min | 2 consecutive failures |
| Health endpoint | `https://<domain>/api/health` | 1 min | 2 consecutive failures |

`GET /api/health` returns `{"status":"ok","version":"<git SHA>"}` with no database
query — it is safe to ping at any interval without waking Neon from scale-to-zero.