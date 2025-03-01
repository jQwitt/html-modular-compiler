import { Document } from 'jsr:@b-fuze/deno-dom/wasm-noinit';
import { HTMLComponentMap } from '../types.ts';

const injectComponents = (
	components: HTMLComponentMap,
	doc: Document,
): Document => {
	for (
		const { name, attributes: baseAttributes } of Object.values(components)
	) {
		const found = doc.querySelectorAll(name);

		// for each found element, merge the base attributes and update the value
		for (const element of found) {
			const merged: Record<string, string> = {};

			for (const [key, base] of Object.entries(baseAttributes || {})) {
				const attr = element.attributes.getNamedItem(key);
				merged[key] = attr ? `${base} ${attr.value}` : base;
			}

			const attrs = Object.entries(merged);
			for (const [key, value] of attrs) {
				element.setAttribute(key, value);
			}
		}
	}

	return doc;
};

export default injectComponents;
