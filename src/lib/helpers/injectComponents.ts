import { Document } from 'jsr:@b-fuze/deno-dom/wasm-noinit';
import { HTMLComponentMap } from '../types.ts';
import parse from './parser/dom.ts';

const injectComponents = (
	components: HTMLComponentMap,
	doc: Document,
): Document => {
	for (
		const { name, base, attributes: baseAttributes } of Object.values(
			components,
		)
	) {
		const found = doc.querySelectorAll(name);

		// for each found element, merge the base attributes and update the value
		for (const element of found) {
			const merged: Record<string, string> = {};

			for (const [key, base] of Object.entries(baseAttributes || {})) {
				const attr = element.attributes.getNamedItem(key);
				merged[key] = attr ? `${base} ${attr.value}` : base;
			}

			// replace the element with our base components html if we don't supply text
			if (!element.innerText) {
				element.innerHTML =
					parse(base, 'text/html').documentElement?.innerHTML ??
						element.innerHTML;
			}

			// apply computed attributes
			const attrs = Object.entries(merged);
			for (const [key, value] of attrs) {
				element.setAttribute(key, value);
			}
		}
	}

	return doc;
};

export default injectComponents;
