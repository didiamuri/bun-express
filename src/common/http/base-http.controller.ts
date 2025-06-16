import type {Request} from "express";
import {BaseHttpController} from 'inversify-express-utils';

export class ExtendedBaseHttpController extends BaseHttpController {

    protected get request(): Request {
        return this.httpContext.request;
    }

    protected get locale(): string {
        const supportedLocales = ['fr', 'en'];
        const defaultLocale = 'en';

        let locale = this.request.cookies?.locale as string;

        if (!locale && this.request.headers["accept-language"]) {
            const acceptLanguageHeader = this.request.headers["accept-language"];
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

    protected get clientIp(): string | undefined {
        let ipAddress: string | undefined;

        if (this.request.headers['cf-connecting-ip']) {
            ipAddress = Array.isArray(this.request.headers['cf-connecting-ip'])
                ? this.request.headers['cf-connecting-ip'][0]
                : this.request.headers['cf-connecting-ip'];
        }

        if (!ipAddress) {
            ipAddress = this.request.ip;
        }

        if (!ipAddress) {
            ipAddress = this.request.socket?.remoteAddress;
        }

        if (ipAddress?.startsWith('::ffff:')) {
            ipAddress = ipAddress.substring(7);
        }

        if (!ipAddress) {
            return undefined;
        }

        return ipAddress;
    }
}
