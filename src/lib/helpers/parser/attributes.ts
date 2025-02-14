import { HTML_ATTRIBUTE } from "./patterns.ts";

const parseAttributes = (html: string) => {
  if (!html.length) {
    return null;
  }

  const raw = html.match(HTML_ATTRIBUTE) ?? [];
  const attrs: Record<string, string> = {};

  if (!raw.length) {
    return null;
  }

  for (const attr of raw) {
    const sanitized = attr.trim().toLowerCase();
    const [name, value] = sanitized.split("=");

    attrs[name] = value.slice(1, -1); // format: '"value"'
  }

  return attrs;
};

export default parseAttributes;
