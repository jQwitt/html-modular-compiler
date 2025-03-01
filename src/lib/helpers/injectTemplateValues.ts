import { Document } from 'jsr:@b-fuze/deno-dom/wasm-noinit';
import parse from './parser/dom.ts';
import print from '../console/index.ts';

const injectTemplateValues = (
	templateValues: Record<string, string>,
	doc: Document,
): Document => {
	const documentString = doc.documentElement?.innerHTML || '';
	if (!documentString.length) return doc;

	const templateKeys = Object.keys(templateValues);

	if (!templateValues || !templateKeys.length) {
		print.warn('no template values found! skipping...');
		return doc;
	}

	let resultString = documentString;
	for (const key of templateKeys) {
		const searchKey = new RegExp(`{${key}}`, 'g');
		const match = resultString.match(searchKey);

		if (match) {
			resultString = resultString.replaceAll(
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
		const unsupportedTemplateValue of resultString.matchAll(
			/{(.+?)}/g,
		)
	) {
		const [, text] = unsupportedTemplateValue;
		print.warn(
			`unsupported template value: {${text}}, consider adding this to your template-values.json`,
		);
	}

	return parse(resultString, 'text/html');
};

export default injectTemplateValues;
