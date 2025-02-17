import { encoder, OUTPUT_DIR } from '../../index.ts';

export const writeOutput = (output: string) => {
	try {
		Deno.mkdirSync(OUTPUT_DIR);
	} catch (e) {
		if (!(e instanceof Deno.errors.AlreadyExists)) {
			return false;
		}
	}

	Deno.writeFileSync(
		`${OUTPUT_DIR}/index.html`,
		encoder.encode(output),
	);
	return true;
};
