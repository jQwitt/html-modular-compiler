import { DOMParser, initParser } from 'jsr:@b-fuze/deno-dom/wasm-noinit';

await initParser();
const parse = new DOMParser().parseFromString;

export default parse;
