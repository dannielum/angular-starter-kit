/// <reference path="../../global.d.ts" />

module starter {
    'use strict';

    export class InterpolateFilter {
        public static Factory (version: string) {
            return (text: string) => {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        }
	}
}
