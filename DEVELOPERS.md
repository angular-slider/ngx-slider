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

## Unit tests

There are a number of unit tests under `src/ngx-slider/` written in standard Angular convention using jasmine framework. To run them, use:
```
npm run test
```

Note: Currently (v1.2.1) most functionality is tested with end-to-end tests. This is not ideal for development, as running through the whole suite takes quite a long time. The plan for the future is to add more unit tests, so that development is easier.

## End-to-end (e2e) tests

End-to-end tests are inside `e2e/` folder and are written using playwright framework. When setting up for the first time, you may need to install additional browser executables that playwright manages separately from its npm installation:
```
npx playwright install
```

To run all end-to-end tests, use:
```
npm run e2e
```

## Lint

The project uses eslint for lint checking. If you are using an IDE such as Visual Studio Code, you will likely see eslint problems highlighted by the IDE. However, you can always run eslint from commandline.

To run eslint, use:
```
npm run lint
```

# Continuous Integration (CI)

The project is also set up to enable continuous integration, although there is currently no active service used for it (it used to be Travis CI until the free tier was disestablished):
```
npm run ci
```

This is a shorthand for running unit tests, e2e tests, building the project with production config and running eslint.

# How generated code works

As of v1.2.1, there are three main code generation scripts.

## `scripts/generate-lib-files.js`
This script prepares some files like `package.json` and `README.md` for the slider library, based on files in top-level directory.

Note that the generated `package.json` for the library will be different from top-level `package.json`. This is because the top-level `package.json` is used to build and run the demo app, while the library `package.json` is specifically crafted for use with `ng-packagr` to build the library and later being included in the resulting NPM package.

## `scripts/generate-demo-app-snippets.js`

This script prepares the demo snippets shown in demo app by pasting code from the samples and generating the HTML templates used in final app. Code highlighting is achieved using [prismjs](https://prismjs.com/).

## `scripts/generate-demo-app-docs.js`

This script generates the API documentation pages in demo app. This is done by running [typedoc](https://typedoc.org/). The pages are then embedded inside an iframe in the demo app.

# Githb pages

The content displayed on Github pages for the slider (https://angular-slider.github.io/ngx-slider/) is contained on `gh-pages` branch as per standard Github convention.

This branch is not meant for manual updates. It is managed automatically based on built demo app files by invoking:
```
npm run publish-gh
```

# Release checklist

1. Check that all tests pass and build is successful:
    ```
    npm run ci
    ```

2. Build slider library:
    ```
    npm run build:lib
    ```

3. Test the built library files locally:

   3.1. In another folder, create a fresh Angular project:
    ```
     ng new ngx-slider-demo
    ```
   3.2. Install ngx-slider as a dependency:
    ```
    ng install @angular-slider/ngx-slider
    ```
   3.3. Add the slider as module and use it somewhere in an Angular component to see it working.

   3.4. Overwrite the installed files by manually copying over the built files: \
   `<ngx-slider-folder>/dist/ngx-slider` -> `<ngx-slider-demo-folder>/node_modules/ngx-slider`

   3.5. Check that the slider continues working in the app.

4. Update `package.json` bumping the version number.

5. Update `CHANGELOG.md` referencing all changes made since last release.

6. Create a release commit and tag it in git:
    ```
    git add -u
    git commit -m "<version number> Release"
    git tag v<version number>
    git push origin master
    git push --tags origin master
    ```
    Note the format of the commit message and tag name for consistency.

7. Publish new package to npm:
    ```
    npm publish ./dist/ngx-slider/
    ```
    **Warning: Be absolutely sure you have the correct built files in place as there is no undoing this action.**

8. Go to [package page on npmjs.org](https://www.npmjs.com/package/@angular-slider/ngx-slider) and check that the new version is available and the README page displays correctly.

9. Go back to the demo app from step 3. and check that published package works with it:

   9.1. Update the slider version in `package.json` to the published version.

   9.2. Re-run `npm install`.

   9.3. Check that the slider still works correctly in the app.

10. Go through each Github issue resolved by this release mentioned in `CHANGELOG.md` and close the issue with a comment mentioning the fix version.

11. Build demo app:
    ```
    npm run build:demo-app
    ```

12. Update Github pages:
    ```
    npm run publish-gh
    ```
    This command will automatically manage the `gh-pages` branch on git, pushing new files to it.

13. Go to [published Github pages](https://angular-slider.github.io/ngx-slider/) for slider and check they behave as expected.

14. Go through StackBlitz examples referenced in the landing page of Github pages and update them to use newest slider version. Note: You may have to wait a while for the version to be available due to NPM caching employed by StackBlitz.