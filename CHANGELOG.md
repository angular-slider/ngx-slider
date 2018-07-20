# 1.0.1
 * moved repository to official angular-slider organisation
 * updated demo app to run under older browsers

# 1.0.0
 * fixed error related to TouchEvent constructor on Firefox and Safari (issue #4)
 * downgraded Angular and ng-bootstrap dependency versions to the minimum required (v5.0.2 and v1.0.0 respectively)
 * fixed errors when using slider component without ng-bootstrap installed
 * added e2e tests for slider component
 * added Travis CI integration

# 0.4.0
 * refactored demo app to show the examples with code snippets
 * reverted view encapsulation of slider component to Angular defaults
 * removed duplication in package.json and README.md between the main project and the NPM library
 * added more API documentation
 * added generation of API documentation using typedoc
 * added scripts to publish demo app and API documentation to Github Pages
 * updated README.md and added DEVELOPERS.md

# 0.3.2
 * add Plunker example to README

# 0.3.1
 * add README.md and LICENSE to NPM package

# 0.3.0
 * re-brand to ng5-slider as the target Angular version is 5+
 * create and release NPM package


# 0.2.0
 * add more examples of usage
 * fix slider behaviour where it was broken in the examples
 * change slider options following refactoring and code design considerations
 * complete first iteration of code refactoring:
   - finish adding TypeScript type signatures everywhere
   - start extracting code to smaller files
   - rename some cryptic variables and functions to more descriptive names
   - start adding Angular bindings for CSS styles currently managed by JqLiteWrapper

# 0.1.0

 * rough rewrite of original code into Angular 2
   - copy-paste of the original JS code
   - add TypeScript type signatures where known
   - adapt from angularjs jqLite element wrappers to a wrapper based on Angular 2's Renderer2
