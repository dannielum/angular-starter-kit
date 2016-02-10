module.exports = {
  bundle: {
    main: {
      scripts: [
        './app/js/tmp/components/version/interpolate-filter.js',
        './app/js/tmp/components/version/version-directive.js',
        './app/js/tmp/components/version/version.js',
        './app/js/tmp/view1/view1Ctrl.js',
        './app/js/tmp/view1/view1Service.js',
        './app/js/tmp/view1/view1.js',
        './app/js/tmp/view2/view2Ctrl.js',
        './app/js/tmp/view2/view2.js',
        './app/js/tmp/app.js'
      ],
      options: {
        uglify: ['production', 'staging'],
        minCss: ['production', 'staging'],
        rev: ['production', 'staging'],
      }
    },
    vendor: {
    }
  }
};
