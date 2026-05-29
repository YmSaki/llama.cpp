import { browser } from '$app/environment';
import {
	overwriteGetLocale,
	setLocale as paraglideSetLocale,
	baseLocale,
	locales
} from '$lib/paraglide/runtime.js';

export type Locale = (typeof locales)[number];

let _locale = $state<Locale>(baseLocale);

// Make Paraglide read from Svelte reactive state so message calls are reactive
if (browser) {
	overwriteGetLocale(() => _locale);
}

export function setLocale(locale: string) {
	const valid = (locales as readonly string[]).includes(locale) ? (locale as Locale) : baseLocale;
	_locale = valid;
	paraglideSetLocale(valid);
}

export function getLocale(): Locale {
	return _locale;
}

export { locales, baseLocale };
