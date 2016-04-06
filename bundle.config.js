module.exports = {
  bundle: {
    main: {
      scripts: [
        './app/javascripts/tmp/components/version/interpolate-filter.js',
        './app/javascripts/tmp/components/version/version-directive.js',
        './app/javascripts/tmp/components/version/version.js',
        './app/javascripts/tmp/view1/view1Ctrl.js',
        './app/javascripts/tmp/view1/view1Service.js',
        './app/javascripts/tmp/view1/view1.js',
        './app/javascripts/tmp/view2/view2Ctrl.js',
        './app/javascripts/tmp/view2/view2.js',
        './app/javascripts/tmp/app.js'
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
