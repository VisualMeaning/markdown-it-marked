/*
 * Typescript type declarations for public interface to plugin.
 *
 * Copyright 2020 Visual Meaning Ltd
 * This is free software licensed as Apache-2.0 - see COPYING for terms.
 */

export type MarkedEnv = {markedPattern?: RegExp};
export type TermOptions = {exact?: boolean, prefix?: boolean, suffix?: boolean};

export function envFromTerms(terms: string[], options?: TermOptions): MarkedEnv;

export function envFromUnicodeTerms(terms: string[], options?: TermOptions): MarkedEnv;

export function plugin(md: unknown): void;
