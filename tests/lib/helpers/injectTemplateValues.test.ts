import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import parse from "../../../src/lib/helpers/parser/dom.ts";

import injectTemplateValues from "../../../src/lib/helpers/injectTemplateValues.ts";

describe("injectComponents", () => {
  it("returns the document when empty document is provided", () => {
    const templateValues: Record<string, string> = {};
    const doc = parse("", "text/html");
    const result = injectTemplateValues(templateValues, doc);

    expect(result).toBe(doc);
  });

  it("returns the document when no template values are provided", () => {
    const templateValues: Record<string, string> = {};
    const doc = parse("<html><p>test doc</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);

    expect(result).toBe(doc);
  });

  it("returns unchanged document when no template values are found", () => {
    const templateValues: Record<string, string> = { "not-found": "value" };
    const doc = parse("<html><p>test doc</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);

    expect(result.documentElement?.innerHTML).toBe(
      doc.documentElement?.innerHTML
    );
  });

  it("returns unchanged document when template values are found, but not provided", () => {
    const templateValues: Record<string, string> = {};
    const doc = parse("<html><p>{text1}</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);

    expect(result).toBe(doc);
  });

  it("returns injected document when template values are found, and provided", () => {
    const newValue = "newValue";
    const templateValues: Record<string, string> = { text1: newValue };
    const doc = parse("<html><p>{text1}</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);
    const expected = parse(`<html><p>${newValue}</p></html>`, "text/html");

    expect(result.documentElement?.innerHTML).toBe(
      expected.documentElement?.innerHTML
    );
  });

  it("returns injected document when multiple template values are found, and provided", () => {
    const newValue = "newValue";
    const templateValues: Record<string, string> = { text1: newValue };
    const doc = parse("<html><p>{text1}</p><p>{text1}</p><p>{text1}</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);
    const expected = parse(`<html><p>${newValue}</p><p>${newValue}</p><p>${newValue}</p></html>`, "text/html");

    expect(result.documentElement?.innerHTML).toBe(
      expected.documentElement?.innerHTML
    );
  });

   it("returns injected document when multiple template values are found, and provided", () => {
    const templateValues: Record<string, string> = { };
    const doc = parse("<html><p>{text1}</p><p>{text1}</p><p>{text1}</p></html>", "text/html");
    const result = injectTemplateValues(templateValues, doc);

    expect(result.documentElement?.innerHTML).toBe(
      doc.documentElement?.innerHTML
    );
  });
});
