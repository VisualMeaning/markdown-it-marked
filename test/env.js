/*
 * Tests for helpers that create render time environment.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

import {envFromTerms, envFromUnicodeTerms} from 'markdown-it-marked';

describe('envFromTerms', () => {
  const completeOptions = {exact: true, prefix: true, suffix: true};
  test.each([
    [[], {}],
    [['a'], {markedPattern: /a/g}],
    [['?'], {markedPattern: /\?/g}],
    [['.*', '.+', '()', '|$'], {markedPattern: /\.\*|\.\+|\(\)|\|\$/g}],
  ])('escaping %O', (strings, expected) => {
    expect(envFromTerms(strings, completeOptions)).toEqual(expected);
  });

  const substringOptions = {prefix: true, suffix: true};
  test.each([
    [['one', 'two'], {markedPattern: /one|two/gi}],
    [['sub', 'substring'], {markedPattern: /substring|sub/gi}],
  ])('sorting %O', (strings, expected) => {
    expect(envFromTerms(strings, substringOptions)).toEqual(expected);
  });

  test.each([
    [['']],
    [['a', '', 'z']],
  ])('checking %O', strings => {
    expect(() => envFromTerms(strings)).toThrow({
      'message': 'markdown-it-marked: zero-length word',
    });
  });

  const fullWordOptions = {prefix: false, suffix: false};
  test.each([
    [['a'], {markedPattern: /\ba\b/gi}],
    [['it\'s', 'done.'], {markedPattern: /\b(?:done\.|it's)\b/gi}],
  ])('using %O', (words, expected) => {
    expect(envFromTerms(words, fullWordOptions)).toEqual(expected);
  });

  const prefixOptions = {prefix: true, suffix: false};
  test.each([
    [['pre'], {markedPattern: /\bpre/gi}],
    [['inter', 'sub', 'trans'], {markedPattern: /\b(?:inter|trans|sub)/gi}],
  ])('prefixes %O', (words, expected) => {
    expect(envFromTerms(words, prefixOptions)).toEqual(expected);
  });

  const suffixOptions = {prefix: false, suffix: true};
  test.each([
    [['er'], {markedPattern: /er\b/gi}],
    [['ism', 'ship', 'tion'], {markedPattern: /(?:ship|tion|ism)\b/gi}],
  ])('prefixes %O', (words, expected) => {
    expect(envFromTerms(words, suffixOptions)).toEqual(expected);
  });
});

describe('envFromUnicodeTerms', () => {
  const completeOptions = {exact: true, prefix: true, suffix: true};
  test.each([
    [[], {}],
    [['a'], {markedPattern: /a/gu}],
    [['?'], {markedPattern: /\?/gu}],
    [['.*', '.+', '()', '|$'], {markedPattern: /\.\*|\.\+|\(\)|\|\$/gu}],
  ])('escaping %O', (strings, expected) => {
    expect(envFromUnicodeTerms(strings, completeOptions)).toEqual(expected);
  });

  const substringOptions = {prefix: true, suffix: true};
  test.each([
    [['one', 'two'], {markedPattern: /one|two/giu}],
    [['sub', 'substring'], {markedPattern: /substring|sub/giu}],
  ])('sorting %O', (strings, expected) => {
    expect(envFromUnicodeTerms(strings, substringOptions)).toEqual(expected);
  });

  test.each([
    [['']],
    [['a', '', 'z']],
  ])('checking %O', strings => {
    expect(() => envFromUnicodeTerms(strings)).toThrow({
      'message': 'markdown-it-marked: zero-length word',
    });
  });

  const fullWordOptions = {prefix: false, suffix: false};
  test.each([
    [['a'], {markedPattern: /(?<=^|\p{Cc}\p{Cf}|\p{P}|\p{Z})a(?=$|\p{Cc}\p{Cf}|\p{P}|\p{Z})/giu}],
    [['it\'s', 'done.'], {markedPattern: /(?<=^|\p{Cc}\p{Cf}|\p{P}|\p{Z})(?:done\.|it's)(?=$|\p{Cc}\p{Cf}|\p{P}|\p{Z})/giu}],
  ])('using %O', (words, expected) => {
    expect(envFromUnicodeTerms(words, fullWordOptions)).toEqual(expected);
  });

  const prefixOptions = {prefix: true, suffix: false};
  test.each([
    [['pre'], {markedPattern: /(?<=^|\p{Cc}\p{Cf}|\p{P}|\p{Z})pre/giu}],
    [['inter', 'sub', 'trans'], {markedPattern: /(?<=^|\p{Cc}\p{Cf}|\p{P}|\p{Z})(?:inter|trans|sub)/giu}],
  ])('prefixes %O', (words, expected) => {
    expect(envFromUnicodeTerms(words, prefixOptions)).toEqual(expected);
  });

  const suffixOptions = {prefix: false, suffix: true};
  test.each([
    [['er'], {markedPattern: /er(?=$|\p{Cc}\p{Cf}|\p{P}|\p{Z})/giu}],
    [['ism', 'ship', 'tion'], {markedPattern: /(?:ship|tion|ism)(?=$|\p{Cc}\p{Cf}|\p{P}|\p{Z})/giu}],
  ])('prefixes %O', (words, expected) => {
    expect(envFromUnicodeTerms(words, suffixOptions)).toEqual(expected);
  });
});
