import { HTML_ATTRIBUTE } from './patterns.ts';

const parseTopLevelAttributes = (html: string) => {
	if (!html.length) {
		return null;
	}

	// simplest way to get the first element of the document
	const raw = html.slice(0, html.indexOf('>') + 1).match(HTML_ATTRIBUTE) ??
		[];
	if (!raw.length) {
		return null;
	}

	const attrs: Record<string, string> = {};
	for (const attr of raw) {
		const sanitized = attr.trim().toLowerCase();
		const [name, value] = sanitized.split('=');

		attrs[name] = value.slice(1, -1); // format: '"value"'
	}

	return attrs;
};

export default parseTopLevelAttributes;
