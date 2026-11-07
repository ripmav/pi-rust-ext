/**
 * Rust Default Extension
 *
 * Injects a default-language policy into the system prompt: all new source
 * code is written in Rust unless the user explicitly asks for another
 * language.
 *
 * Install: ~/.pi/agent/extensions/rust-default.ts (global)
 *          .pi/extensions/rust-default.ts (project-local)
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const RUST_DEFAULT = [
  "- Default language policy: write all new source code in Rust, following Cargo conventions (src/main.rs or src/lib.rs, Cargo.toml).",
  "- Use a different language only if the user explicitly requests it for the current task, or if the artifact is not executable source code (documentation, configuration, data files, SQL, shell).",
  "- No Python for helper scripts or one-liners (including `python3 -c`) unless the user explicitly asks for it. Use bash tools (awk, sed, jq, grep) for quick jobs; Rust for anything more.",
  "- When editing an existing file, keep the language that file already uses; the Rust default applies to new code.",
].join("\n");

let rustEnabled = true;

export default function rustDefault(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => {
    if (rustEnabled) {
      event.systemPromptOptions.sections.rust_default = RUST_DEFAULT;
    } else {
      delete event.systemPromptOptions.sections.rust_default;
    }
  });

  pi.registerCommand("rustoff", {
    description: "Disable the Rust default for this session",
    handler: async (_args, ctx) => {
      rustEnabled = false;
      ctx.ui.notify("Rust default off for this session. /ruston re-enables it.", "info");
    },
  });

  pi.registerCommand("ruston", {
    description: "Re-enable the Rust default for this session",
    handler: async (_args, ctx) => {
      rustEnabled = true;
      ctx.ui.notify("Rust default on: new source code is written in Rust.", "info");
    },
  });
}
