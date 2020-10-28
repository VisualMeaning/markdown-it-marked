/*
 * Tests for render of markdown after plugin installation.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import MarkdownIt from 'markdown-it';

import {envFromUnicodeTerms, plugin} from 'markdown-it-marked';

describe('default options', () => {
  const mi = MarkdownIt()
    .use(plugin);

  test.each([
    ['', ''],
    ['x', '<p>x</p>\n'],
    ['x\n\ny', '<p>x</p>\n<p>y</p>\n'],
  ])('no words given %O', (input, expected) => {
    expect(mi.render(input)).toEqual(expected);
  });

  test.each([
    [/x/g, '', ''],
    [/x/g, 'y', 'y'],
    [/x/g, 'x', '<mark>x</mark>'],
    [/x/g, 'xy', '<mark>x</mark>y'],
    [/y/g, 'xy', 'x<mark>y</mark>'],
    [/y/g, 'xyz', 'x<mark>y</mark>z'],
    [/x|z/g, 'xyz', '<mark>x</mark>y<mark>z</mark>'],
    [
      /\ba\b/g,
      'a change is as good as a rest',
      '<mark>a</mark> change is as good as <mark>a</mark> rest',
    ],
  ])('inline match %O in %O', (pat, input, expected) => {
    expect(mi.renderInline(input, {markedPattern: pat})).toEqual(expected);
  });

  test.each([
    [/x/g, '', ''],
    [/x/g, 'y', '<p>y</p>\n'],
    [/x/g, 'x', '<p><mark>x</mark></p>\n'],
    [
      /x/g,
      '[![x](./x)](./x)',
      '<p><a href="./x"><img src="./x" alt="x"></a></p>\n',
    ],
    [
      /a/gi,
      '* A\n  * a\n  * b\n* B\n  * a\n',
      `\
<ul>
<li><mark>A</mark>
<ul>
<li><mark>a</mark></li>
<li>b</li>
</ul>
</li>
<li>B
<ul>
<li><mark>a</mark></li>
</ul>
</li>
</ul>
`,
    ],
  ])('block match %O in %O', (pat, input, expected) => {
    expect(mi.render(input, {markedPattern: pat})).toEqual(expected);
  });
});

describe('integration', () => {
  const mi = MarkdownIt()
    .use(plugin);

  const ampEnv = envFromUnicodeTerms(['a', '&', 'b']);
  test.each([
    ['', ''],
    ['a & b', '<mark>a</mark> <mark>&amp;</mark> <mark>b</mark>'],
    ['aa && bb', 'aa <mark>&amp;</mark><mark>&amp;</mark> bb'],
  ])('real world %O in %O', (input, expected) => {
    expect(mi.renderInline(input, ampEnv)).toEqual(expected);
  });
});
