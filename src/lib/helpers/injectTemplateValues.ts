import { Document } from 'jsr:@b-fuze/deno-dom/wasm-noinit';
import parse from './parser/dom.ts';
import print from '../console/index.ts';

const injectTemplateValues = (
	templateValues: Record<string, string>,
	doc: Document,
): Document => {
	const templateKeys = Object.keys(templateValues);
	if (!templateValues || !templateKeys.length) {
		print.warn('no template values found! skipping...');
		return doc;
	}

	let documentString = doc.documentElement?.innerHTML || '';
	for (const key of templateKeys) {
		const searchKey = new RegExp(`{${key}}`, 'g');
		const match = documentString.match(searchKey);

		if (match) {
			documentString = documentString.replaceAll(
				searchKey,
				templateValues[key],
			);
		} else {
			print.warn(
				`no instances of template value: {${key}}, consider removing from your template-values.json`,
			);
		}
	}

	// anything left over is not a template value
	for (
		const unsupportedTemplateValue of documentString.matchAll(/{(.+?)}/gi)
	) {
		const [, text] = unsupportedTemplateValue;
		print.warn(
			`unsupported template value: {${text}}, consider adding this to your template-values.json`,
		);
	}

	return parse(documentString, 'text/html');
};

export default injectTemplateValues;
