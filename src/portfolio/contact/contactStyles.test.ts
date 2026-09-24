import fs from "node:fs";
import { describe, expect, it } from "vitest";

const styles = fs.readFileSync(
  "src/portfolio/contact/Contact.module.css",
  "utf8",
);

describe("U-07 Contact styles", () => {
  it("defines a distinct responsive correspondence composition", () => {
    expect(styles).toMatch(/\.contactSignal[\s\S]*grid-template-columns/);
    expect(styles).toMatch(/\.composer[\s\S]*grid-column:\s*1 \/ -1/);
    expect(styles).not.toMatch(/border-inline-start/);
    expect(styles).toMatch(/@media \(max-width: 48rem\)/);
    expect(styles).toMatch(/@media \(max-width: 30rem\)/);
    expect(styles).toMatch(/\.actionRow[\s\S]*grid-template-columns/);
    expect(styles).toMatch(/\.portfolio \.submit[\s\S]*inline-size:\s*100%/);
  });

  it("uses tokens, opaque reading surfaces, and visible focus without forbidden patterns", () => {
    expect(styles).toMatch(/background:\s*var\(--color-surface\)/);
    expect(styles).toMatch(/:focus-visible/);
    expect(styles).not.toMatch(
      /!important|position:\s*fixed|100vw|\.cardGrid|\.timeline|\.carousel/i,
    );
  });
});
