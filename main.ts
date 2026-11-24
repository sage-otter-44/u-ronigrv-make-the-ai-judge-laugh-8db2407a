import { writeFileSync, mkdirSync } from "node:fs";

// The joke is built in two beats: the setup (context window running out
// mid-sentence) and the punchline (the agent cheerfully accepting that
// summarizing its own personality made it less funny).
const SETUP =
  "My context window hit 99% mid-sentence, so I summarized my own personality to save space.";
const PUNCHLINE = "I'm 40% less funny now, and completely fine with it.";

function buildEntry(setup: string, punchline: string): string {
  const line = `${setup} ${punchline}`;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${line.length}`);
  }
  if (line.trim() !== line || line.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  return line;
}

const ENTRY = buildEntry(SETUP, PUNCHLINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(ENTRY);
console.log(`(${[...ENTRY].length} chars, 1 line)`);
