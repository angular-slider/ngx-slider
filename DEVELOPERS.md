# Contributing to ngx-slider

# Structure

The repository is set up as an Angular project generated using ng-cli, which contains both the slider component, and a demo app.

The slider library is exported to an NPM package using [ng-packagr](https://github.com/dherges/ng-packagr), while the demo app is built and published to Github Pages.

The project relies on some auto-generated code using a number of scripts in `scripts/` directory. To ensure that everything works as expected, you should always use `npm run` commands as described below. Using `ng` commands directly might not always work.

# Building the library

To build the ngx-slider library (NPM package), use:
```
npm run build:lib
```

The ngx-slider NPM package files will be generated in `dist/` folder.

# Running the demo app

To build and run the demo app, use:
```
npm run start
```

The demo app should build and start on default URL `http://localhost:4200`.

# Running tests

To run unit tests, use:
```
npm run test
```

To run e2e tests, use:
```
npm run e2e
```

To run tslint, use:
```
npm run lint
```

Note: Currently (v1.2.1) most functionality is tested with e2e tests. This is not ideal for development, as running through the whole suite takes quite a long time. The plan for the future is to add more unit tests, so that development is easier.

# Travis CI

The project is also set up to use Travis CI, which runs the script:
```
npm run ci
```

This is a shorthand for running unit tests, e2e tests, building the project with production config and running tslint.

# How generated code works

As of v1.2.1, there are three main code generation scripts.

## `scripts/generate-lib-files.js`
This script prepares some files like `package.json` and `README.md` for the slider library, based on files in top-level directory.

Note that the generated `package.json` for the library will be different from top-level `package.json`. This is because the top-level `package.json` is used to build and run the demo app, while the library `package.json` is specifically crafted for use with `ng-packagr` to build the library and later being included in the resulting NPM package.

## `scripts/generate-demo-app-snippets.js`

This script prepares the demo snippets shown in demo app by pasting code from the samples and generating the HTML templates used in final app. Code highlighting is achieved using [prismjs](https://prismjs.com/).

## `scripts/generate-demo-app-docs.js`

This script generates the API documentation pages in demo app. This is done by running [typedoc](https://typedoc.org/) and doing a bit of work to get the resulting HTML files in shape to be included as Angular components in the demo app. This is a bit hacky at the moment, as this is not a usual use-case for typedoc, but it works for now.