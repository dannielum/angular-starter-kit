# angular-starter-kit — the starter kit for AngularJS apps

I have find a lot of application skeleton for the AngularJS app, but none of them fit exactly what
I want. This starter kit app is built on top of the [angular-seed](https://github.com/angular/angular-seed) app.
Since this starter kit is based on angular-seed, please read the README file from angular-seed first before 
you proceed. 

## Features

Things added on top of the angular seed app:

* [Gulp](http://gulpjs.com/)
* [TypeScript](http://www.typescriptlang.org/)

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install` and `typings install`.  You should find that you have three new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files
* `typings` - contains the typescript definitions

### Run the Application

To start the app, type this in the console or terminal.

```
gulp run
```

Now browse to the app at `http://localhost:8080/`.

To run the app with watcher and livereload, just type `gulp`

```
gulp
```

When you are ready to deploy for production

```
NODE_ENV=production gulp
```

This will bundle and minify the js code.

## Directory Layout

```
app/                    --> all of the source files for the application
  css/                  --> all css files
  partials/             --> all partial html files
    view1/                --> the view1 view template
      view1.html            --> the partial template
    view2/                --> the view2 view template
      view2.html            --> the partial template
  scss/                 --> all scss files
    main.scss               --> the scss file
  tests/                --> all tests files
    components/           --> all app specific modules
      version_test.ts            --> "version" value service tests
      version-directive_test.ts  --> version directive tests
      interpolate-filter_test.ts --> interpolate filter tests
    view1/                --> the view1 view logic
      view1_test.ts         --> tests of the controller
    view2/                --> the view2 view logic
      view2_test.ts         --> tests of the controller
  ts/                   --> all typescript files
    components/           --> all app specific modules
      version/              --> version related components
      version.ts                 --> version module declaration and basic "version" value service
      version-directive.ts       --> custom directive that returns the current app version
      interpolate-filter.ts      --> custom interpolation filter
    view1/                --> the view1 view logic
      view1.html            --> the partial template
      view1.ts              --> the controller logic
    view2/                --> the view2 view logic
      view2.html            --> the partial template
      view2.ts              --> the controller logic
    app.ts                --> main application module
    global.d.ts           --> global definition
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Testing

There are two kinds of tests in the angular-starter-kit application: Unit tests and End to End tests.

### Running Unit Tests

```
gulp test
```

Running `gulp test` will open a browser window and then close automatically after the tests are completed.
If you need to debug the tests, you can run:

```
gulp test --debug
```

When the browser window open, click the DEBUG button to open the tests in new tab and then use your browser 
developer inspector to debug it.


### End to end testing

The angular-starter-kit app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.
