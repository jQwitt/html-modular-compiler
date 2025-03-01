import { Document } from 'jsr:@b-fuze/deno-dom/wasm-noinit';
import parse from './parser/dom.ts';
import print from '../console/index.ts';

const injectTemplatedValues = (
	templateValues: Record<string, string>,
	doc: Document,
): Document => {
	const documentString = doc.documentElement?.innerHTML || '';
	if (!doc.documentElement || !documentString) return doc;

	if (!templateValues || !Object.keys(templateValues).length) {
		print.warn('no template values found! skipping...');
		return doc;
	}

	let resultString = documentString;
	for (
		const match of documentString.matchAll(/{(.+?)}/g) || []
	) {
		const [, key] = match;
		const value = templateValues[key];

		if (value) {
			resultString = resultString.replace(
				`{${key}}`,
				value || '',
			);
		} else {
			print.warn(
				`unrecognized template: {${key}}, consider adding it to your template-values.json`,
			);
		}
	}

	return parse(resultString, 'text/html');
};

export default injectTemplatedValues;
