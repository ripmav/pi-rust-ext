# rust-default — Pi extension

Makes Pi write all new source code in Rust by default. A different language
is used only when you explicitly ask for one.

## Install

Global (all projects):

    mkdir -p ~/.pi/agent/extensions
    cp rust-default.ts ~/.pi/agent/extensions/

Project-local:

    mkdir -p .pi/extensions
    cp rust-default.ts .pi/extensions/

Then start Pi, or run `/reload` in a running session.

## Test

    pi -e ./rust-default.ts

## Commands

- `/rustoff` — disable the Rust default for the current session
- `/ruston` — re-enable it

State is per process: it resets to enabled on Pi restart or `/reload`.

## How it works

The extension listens to `before_agent_start` and adds a `rust_default`
section to the system prompt options. Pi diffs sections against what the
model already has and patches only this one into the context, so the
default holds across turns without replacing the whole prompt.

## Remove

Delete the file and run `/reload`.

## License

Licensed under the [MIT License](./LICENSE).
