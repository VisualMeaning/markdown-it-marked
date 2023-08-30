/*
 * Create regular expression patterns for finding text runs to mark.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

function esc(s) {
  return s.replace(/[\\.[\]^$()|*+?{}]/g, '\\$&');
}

function buildEnv(strings, pre, suf, flags) {
  const keys = Object.keys(strings);
  keys.sort(function _sortLongestReverse(a, b) {
    return strings[a].length - strings[b].length || b - a;
  });

  if (!strings[keys[0]].length) {
    throw new Error('markdown-it-marked: zero-length word');
  }

  const parts = [pre];
  let i = keys.length;
  while (--i) {
    parts.push(esc(strings[keys[i]]), '|');
  }
  parts.push(esc(strings[keys[0]]), suf);

  return {markedPattern: new RegExp(parts.join(''), flags)};
}

const boundaries = ['', '\\b', '(?:', '\\b(?:', ')', ')\\b'];
const endClasses = '|\\p{Cc}\\p{Cf}|\\p{P}|\\p{Z})';
const unicodeParts = ['', '(?<=^' + endClasses, '(?:', ')', '(?=$' + endClasses];

export function envFromTerms(terms, options) {
  if (!terms.length) {
    return {};
  }
  options ||= {};

  // If terms may be prefixes, do not include boundary suffix.
  // If terms may be suffixes, do not include boundary prefix.
  const boundaryPre = !options.suffix;
  const boundarySuf = !options.prefix;
  const contain = (boundaryPre | boundarySuf) & terms.length > 1;
  const pre = boundaries[contain * 2 | boundaryPre];
  const suf = boundaries[contain * 4 | boundarySuf];

  // If exact match is required, remove 'i' flag.
  const flags = 'ig'.slice(!!options.exact);

  return buildEnv(terms, pre, suf, flags);
}

export function envFromUnicodeTerms(terms, options) {
  if (!terms.length) {
    return {};
  }
  options ||= {};

  // If terms may be prefixes, do not include boundary suffix.
  // If terms may be suffixes, do not include boundary prefix.
  const boundaryPre = !options.suffix;
  const boundarySuf = !options.prefix;
  const contain = boundaryPre | boundarySuf && terms.length > 1;
  const pre = unicodeParts[+boundaryPre] + unicodeParts[contain * 2];
  const suf = unicodeParts[contain * 3] + unicodeParts[boundarySuf * 4];

  // If exact match is required, remove 'i' flag.
  const flags = 'igu'.slice(!!options.exact);

  return buildEnv(terms, pre, suf, flags);
}
