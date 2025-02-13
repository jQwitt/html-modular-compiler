import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { parseAttributes } from "../../../src/utils/helpers/parser/index.ts";

describe("parser/attributes", () => {
  it("returns null for empty HTML string", () => {
    const raw = "";
    const result = parseAttributes(raw);

    expect(result).toBe(null);
  });

  it("return null if poorly formatted", () => {
    const raw = [
      '<element,attribute="">',
      `<element attributes='">`,
      `<elementattributes="">`,
    ];
    const results = raw.map((str) => parseAttributes(str));

    for (const result of results) {
      expect(result).toBe(null);
    }
  });

  it("returns parsed attributes", () => {
    const raw = '<element attribute="value">';
    const result = parseAttributes(raw);

    expect(result).toEqual({ attribute: "value" });
  });

  it("returns parsed attributes with spaced values", () => {
    const raw = '<element style="color: red">';
    const result = parseAttributes(raw);

    expect(result).toEqual({ style: "color: red" });
  });

  it("returns parsed attributes with templated values", () => {
    const raw = '<element class="class {{classes}}">';
    const result = parseAttributes(raw);

    expect(result).toEqual({ class: "class {{classes}}" });
  });
});
