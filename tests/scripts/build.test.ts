import { describe, it } from 'jsr:@std/testing/bdd';
import { build } from '../../src/scripts/build.ts';
import {
  assertSpyCall,
  assertSpyCalls,
  spy,
} from "jsr:@std/testing/mock";
import { COMPONENTS_DIR } from '../../src/lib/index.ts';

describe('build', () => {
    it('builds the project correctly', () => {
        const readDirSpy = spy(Deno, "readDirSync");

        build();

        assertSpyCall(readDirSpy, 0, {
            args: [COMPONENTS_DIR],
        });
        assertSpyCalls(readDirSpy, 1);
    });
});