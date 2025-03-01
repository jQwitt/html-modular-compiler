import { describe, it } from 'jsr:@std/testing/bdd';
import {
  assertSpyCall,
  assertSpyCalls,
  spy,
} from "jsr:@std/testing/mock";
import { clean } from '../../src/scripts/clean.ts';

describe('clean', () => {
    it('removes all coverage files', () => {
        const readDirSpy = spy(Deno, "readDirSync");
        const deleteFileSpy = spy(Deno, "removeSync");

        clean();

        assertSpyCall(readDirSpy, 0, {
            args: ["coverage"],
        });
        assertSpyCalls(deleteFileSpy, 1);
        assertSpyCalls(readDirSpy, 1);
        assertSpyCalls(deleteFileSpy, 1);
    });
});