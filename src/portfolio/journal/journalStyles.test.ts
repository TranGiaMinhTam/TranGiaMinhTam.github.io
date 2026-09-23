import fs from "node:fs";
import { describe, expect, it } from "vitest";

const styles = fs.readFileSync(
  "src/portfolio/journal/JournalRoute.module.css",
  "utf8",
);

describe("U-07 Journal styles", () => {
  it("defines a bounded long-form field-note composition and narrow reflow", () => {
    expect(styles).toMatch(/\.note\s*\{[^}]*width:\s*min\([^}]*82rem\)/);
    expect(styles).toMatch(/\.noteSection[\s\S]*grid-template-columns/);
    expect(styles).toMatch(/\.prose,[\s\S]*68ch/);
    expect(styles).toMatch(/@media \(max-width: 48rem\)/);
    expect(styles).toMatch(/@media \(max-width: 30rem\)/);
    expect(styles).not.toMatch(/border-inline-start/);
  });

  it("uses opaque token surfaces and visible focus without forbidden patterns", () => {
    expect(styles).toMatch(/background:\s*var\(--color-surface\)/);
    expect(styles).toMatch(/:focus/);
    expect(styles).not.toMatch(
      /!important|position:\s*fixed|100vw|\.cardGrid|\.timeline|\.carousel/i,
    );
  });
});
