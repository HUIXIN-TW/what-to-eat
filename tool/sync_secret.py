#!/usr/bin/env python3
"""Sync local env secrets to Cloudflare Worker via Wrangler."""

from __future__ import annotations

import argparse
import pathlib
import subprocess
import sys

DEFAULT_KEYS = [
    "MONGODB_URI",
    "GOOGLE_ID",
    "GOOGLE_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
]


def parse_env_file(path: pathlib.Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()

        if not key:
            continue

        if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
            value = value[1:-1]

        values[key] = value
    return values


def put_secret(key: str, value: str) -> None:
    result = subprocess.run(
        ["npx", "wrangler", "secret", "put", key],
        input=value,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"failed to sync secret: {key}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Sync secrets from a local env file into Cloudflare Worker secrets."
    )
    parser.add_argument(
        "--env-file",
        default=".env.local",
        help="Env file to read secrets from (default: .env.local).",
    )
    parser.add_argument(
        "--keys",
        nargs="*",
        default=DEFAULT_KEYS,
        help=(
            "Secret keys to sync from env file. "
            "Default: MONGODB_URI GOOGLE_ID GOOGLE_CLIENT_SECRET NEXTAUTH_SECRET."
        ),
    )
    parser.add_argument(
        "--nextauth-url",
        default=None,
        help=(
            "Optional deployed URL to sync as NEXTAUTH_URL "
            "(for example: https://what-to-eat.xxx.workers.dev)."
        ),
    )
    args = parser.parse_args()

    env_path = pathlib.Path(args.env_file)
    if not env_path.exists():
        print(f"[sync_secret] env file not found: {env_path}", file=sys.stderr)
        return 1

    env_values = parse_env_file(env_path)

    missing = [key for key in args.keys if key not in env_values]
    if missing:
        print(
            "[sync_secret] missing keys in env file: " + ", ".join(missing),
            file=sys.stderr,
        )
        return 1

    print(f"[sync_secret] syncing {len(args.keys)} secrets from {env_path} ...")
    for key in args.keys:
        put_secret(key, env_values[key])
        print(f"[sync_secret] synced: {key}")

    if args.nextauth_url:
        put_secret("NEXTAUTH_URL", args.nextauth_url)
        print("[sync_secret] synced: NEXTAUTH_URL (from --nextauth-url)")

    print("[sync_secret] done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
