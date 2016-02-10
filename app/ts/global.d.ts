/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="view1/view1Ctrl.ts" />
/// <reference path="view1/view1Service.ts" />
/// <reference path="view2/view2Ctrl.ts" />
/// <reference path="components/version/interpolate-filter.ts" />
/// <reference path="components/version/version-directive.ts" />
/// <reference path="components/version/version.ts" />

interface IGlobalVars {
	settings: {
		sitePath: string
	};
}

interface Window {
	global_vars: IGlobalVars;
}
