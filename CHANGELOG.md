* 1.2.0
 * add CSS animations ported from angularjs-slider (issue #72)
 * re-write model update code with rxjs, fixing a number of bugs in this area (issue #69, #86, #91, #93, #95)
 * fix behaviour of draggable range when moving it with mouse (issue #80)
 * fix prepare script on non-Unix platforms (issue #103)

* 1.1.14
 * add ability to set focus programmatically (issue #64)
 * clarify interaction of stepsArray with other options (issue #60)
 * document known issues in README
 * remove obsolete enforceRange option
 * remove some redudant refresh and change callbacks

* 1.1.13
 * fix regression when updating model values through reactive forms (issues #61, #62)

* 1.1.12
 * fix regression caused by applying model value and options changes in the wrong order when both change at the same time (issue #56)
 * allow dynamic HTML in ticks legend (issue #49)
 * improve rendering performance of simple sliders (PR #59)

* 1.1.11
 * don't normalise values when stepsArray option is used (issue #52)

* 1.1.10
 * always convert input values to numbers
 * make sure range invariant is always satisfied (issue #48 follow-up)

# 1.1.9
 * make sure model values are always in allowed range (issue #48)

# 1.1.8
 * fix broken link in README (PR #44)
 * add documentation for changing options object dynamically
 * adjust layout of API documentation page on mobile

# 1.1.7
 * add support for Angular reactive forms (issue #24)
 * fix Angular peer dependency (issue #39)
 * add CSS styling guide
 * embed API documentation in demo app

# 1.1.6
 * fix event handling when clicking on tick value (issue #36)
 * fix warnings about event listener violation (issue #22)
 * new layout of demo app

# 1.1.5
 * fix event handling when touching exactly the tick element (issue #32)
 * update model value if value is not initially in steps array (issue #35)
 * added more e2e tests

# 1.1.4
 * fixed slider jumping to first value if value is not in steps array (issue #29)
 * fixed floating-point rounding in slider value calculations (issue #25)
 * exposed SCSS files in distribution package (PR #28)

# 1.1.3
 * changed initialization code to fix issue with slider shown dynamically through CSS animations (issue #16)

# 1.1.2
 * added manual refresh mechanism to the slider (issue #15)

# 1.1.1
 * fixed AOT compilation bug (issue #13)
 * added support for user-initiated events (issue #9)
 * minor demo app changes

# 1.1.0
 * removed dependency on ng-bootstrap, providing an HTML standard or user-customisable way of rendering tooltips (issue #7)

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
