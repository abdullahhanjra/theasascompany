#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ELECTRON_BIN="$SCRIPT_DIR/../../node_modules/electron/dist/electron"

if [ -f "$ELECTRON_BIN" ]; then
  export ELECTRON_RUN_AS_NODE=1
  "$ELECTRON_BIN" "$@"
else
  node "$@"
fi
