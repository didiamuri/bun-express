import type {Request} from "express";

export function getLanguage(request: Request) {
    const supportedLocales = ['fr', 'en'];
    const defaultLocale = 'en';

    let locale = request.cookies?.locale as string;

    if (!locale && request.headers["accept-language"]) {
        const acceptLanguageHeader = request.headers["accept-language"];
        const acceptedLanguages = typeof acceptLanguageHeader === "string"
            ? acceptLanguageHeader
                .split(',')
                .map(lang => lang?.split(';')[0]?.trim())
                .filter(Boolean)
            : [];

        locale = acceptedLanguages
            .map((lang) => lang?.split('-')?.[0])
            .find((lang): lang is string => supportedLocales.includes(lang as string)) ?? defaultLocale;
    } else if (!locale) {
        locale = defaultLocale;
    }
    return locale;
}