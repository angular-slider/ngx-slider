# Contributing to ng5-slider

# Structure

The repository is set up as an Angular project generated using ng-cli with the slider component contained in one of the app's modules. The slider is then exported to an NPM package using [ng-packagr](https://github.com/dherges/ng-packagr).

# Running the demo app

The demo app is built dynamically based on the current content of code snippets which are pasted as code into the HTML templates. This is done by script in `scripts/generate-demo-ap-templates.js`, or by using this useful shortcut:
```
npm run prepare:demo-app
```

Now you should be able to run the main demo app as any old Angular project:
```
ng serve
```

Alternatively, you can run both of the above commands using:
```
npm run start
```

# Running unit and e2e tests

Unit and e2e tests are run just as any standard Angular project:
```
ng test
ng e2e
```

# Building the NPM package

As with the demo app, some files for NPM package are generated dynamically using `scripts/generate-lib-files.js`, before ng-packagr can be run. There is a shortcut to run this script:
```
npm run prepare:lib
```

For simplicity, running the above script and packagr together is simplified to this shortcut:
```
npm run build:lib
```

The NPM package files will be generated in `dist/`, and the package should be ready to publish.

# Testing the NPM package

Before publishing the package, it is possible to test it locally with the demo app. To do this, a secondary app configuration is defined in `.angular-cli.json`, so you can do:
```
ng serve --app=demo-app-dist
```

This should hopefully help to find any problems before publishing the package itself to NPM.

# Generating API docs

[typedoc](https://github.com/TypeStrong/typedoc) is used to generate API documentation for the code:
```
npm run build:docs
```

The command will save the output in `docs/`.

# Development plans

The rewrite from original AngularJS code still leaves a few bits and pieces that are not quite what would fit the new Angular 2+ development model.

The main concept of the old code is reacting to every change of options or input and then basically re-running the same update code every time, managing the slider DOM elements directly like setting their position and injecting label text as inner HTML.

The intention is to gradually rewrite the code to a more Angular-ised version where the slider elements are sub-components which are updated using Angular bindings rather than manual DOM manipulation. Hopefully, Angular's `HostBinding` will also help simplify the event handling code, which is quite spaghetti-like at the moment.
