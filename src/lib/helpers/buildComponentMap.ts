import { COMPONENTS_DIR, decoder } from '../index.ts';
import { HTMLComponentMap } from '../types.ts';
import { parseTag, parseTopLevelAttributes } from './parser/index.ts';

const buildComponentMap = () => {
	const components = Deno.readDirSync(COMPONENTS_DIR);
	const map: HTMLComponentMap = {};

	for (const { name } of components) {
		const key = name.split('.')[0].trim(); // format: [name].html
		if (map[key]) {
			throw new Error(`Duplicate component name: ${name}`);
		}

		const base = decoder.decode(
			Deno.readFileSync(`${COMPONENTS_DIR}/${name}`),
		);
		const attributes = parseTopLevelAttributes(base);
		const tag = parseTag(base);

		map[key] = {
			name: key,
			tag,
			base,
			attributes,
		};
	}

	return map;
};

export default buildComponentMap;
