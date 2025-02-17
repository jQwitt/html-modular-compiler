import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import parse from '../../../src/lib/helpers/parser/dom.ts';

import injectComponents from '../../../src/lib/helpers/injectComponents.ts';
import { HTMLComponentMap } from '../../../src/lib/types.ts';

describe('injectComponents', () => {
    it('returns the document when no compoennts are provided', () => {
        const components: HTMLComponentMap = {};
        const doc = parse('<html><p>test doc</p></html>', 'text/html');
        const result = injectComponents(components, doc);

        expect(result).toBe(doc);
    });

    it('returns the document when no valid components exist within the document', () => {
        const components: HTMLComponentMap = {
            button: {
                name: 'button',
                base: '<button class="button" role="button"></button>',
                attributes: {
                    class: 'button',
                    role: 'button',
                },
            },
        };
        const doc = parse('<html><p>test doc</p></html>', 'text/html');
        const result = injectComponents(components, doc);

        expect(result).toBe(doc);
    });

    it('injects valid components into the document', () => {
        const components: HTMLComponentMap = {
            button: {
                name: 'button',
                base: '<button class="button" role="button"></button>',
                attributes: {
                    class: 'button',
                    role: 'button',
                },
            },
        };
        const doc = parse('<html><p>test doc</p><button>test button</button></html>', 'text/html');
        const expected = parse('<html><p>test doc</p><button class="button" role="button">test button</button></html>', 'text/html');
        const result = injectComponents(components, doc);

        expect(result.getRootNode.toString()).toBe(expected.getRootNode.toString());
    });

    it('merges attributes for valid components', () => {
         const components: HTMLComponentMap = {
            button: {
                name: 'button',
                base: '<button class="button" role="button"></button>',
                attributes: {
                    class: 'button',
                    role: 'button',
                },
            },
        };
        const doc = parse('<html><p>test doc</p><button class="full-width color-red" data-stid="test-button">test button</button></html>', 'text/html');
        const expected = parse('<html><p>test doc</p><button class="button full-width" role="button">test button</button></html>', 'text/html');
        const result = injectComponents(components, doc);

        expect(result.getRootNode.toString()).toBe(expected.getRootNode.toString());
    });

    it('merges attributes for valid components without base attributes', () => {
         const components: HTMLComponentMap = {
            button: {
                name: 'button',
                base: '<button></button>',
                attributes: null,
            },
        };
        const doc = parse('<html><p>test doc</p><button class="full-width color-red" data-stid="test-button">test button</button></html>', 'text/html');
        const expected = parse('<html><p>test doc</p><button class="full-width color-red" data-stid="test-button">test button</button></html>', 'text/html');
        const result = injectComponents(components, doc);

        expect(result.getRootNode.toString()).toBe(expected.getRootNode.toString());
    });
});