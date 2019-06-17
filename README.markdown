jquery.tocify.js - jQuery Table of Contents
-------------------------------------------

Note: I haven't had time to maintain this repository for the last few years, so if anyone would like a particular fix just send me a tip via Paypal (gfranko5@yahoo.com) and I'll look into it

A jQuery plugin that dynamically generates a table of contents. Tocify can be optionally styled with **Twitter Bootstrap** or **jQueryUI Themeroller**, and optionally animated with jQuery show/hide effects. Tocify also optionally provides support for **smooth scrolling**, **scroll highlighting**, **scroll page extending**, and **forward and back button support**.

[Homepage](http://gregfranko.com/jquery.tocify.js/)

[Annotated Source Code](http://gregfranko.com/jquery.tocify.js/docs/jquery.tocify.html)

**Notable Features**

   - Themeable with **Twitter Bootstrap** or **jQueryUI Themeroller**

   - Supports dynamic scroll and click **jQuery show/hide effects**

   - Supports forward and back button support

   - Supports **smooth scrolling** animations

   - Supports dynamic **scroll highlighting**

   - Supports a **page extender** option to make sure a page is big enough to scroll to all table of content items

   - Passes **jsHint** with no errors

##Requirements
jQuery 1.7.2+

jQueryUI Widget Factory 1.8.21+

##Browser Support
IE7+, Firefox 4+, Chrome, Safari 4+, and Opera 11+

##Unit Tests
All unit tests are written using the Jasmine Framework (Work in Progress)

##Contributing
Take care to maintain the existing coding style. Add Jasmine unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

If you plan to contribute to `Tocify` in the future, keep in mind that you should make sure your code passes the Grunt checks.  If you are on Windows (like me) remember you need to run the grunt command using `grunt.cmd`.  Also, if you have trouble getting the Jasmine Unit Tests to work with PhantomJS 1.5 (the current release), install PhantomJS 1.3.

After you have verified your code, send a pull request to the `Tocify` dev branch.  After you send a pull request, you will hear back from me shortly after I review your code.

You'll find source code in the "src" subdirectory!

##Forking
If you find that you need a feature that Tocify does not currently support, either let me know via the Tocify issue tracker, or fork Tocify on Github and easily extend it to create your own widget!

###Contributors

  * [Greg Franko](https://github.com/gfranko)

  * [Mat Ryer, Stretchr](https://github.com/matryer)

##Change Log

`1.9.0` - October 1, 2013

- Fixed hash/history bug that threw a JavaScript error when the hash did not match an element on the page
- Fixed bug that affected TOC items which contained special characters [#45](https://github.com/gfranko/jquery.tocify.js/issues/45)
- Only register scroll event handlers if necessary [#44](https://github.com/gfranko/jquery.tocify.js/issues/44)
- Improved the **scrollHistory** option [#42](https://github.com/gfranko/jquery.tocify.js/issues/42)

`1.8.0` - September 16, 2013

- Added the **scrollHistory** option [#41](https://github.com/gfranko/jquery.tocify.js/issues/41)
- Fixed a non-linear nesting bug [#40](https://github.com/gfranko/jquery.tocify.js/issues/40)

`1.7.0` - August 13, 2013

- Improved the CSS class naming convention and implementation
- Improved the CSS handling if no TOC items are found

`1.6.0` - July 24, 2013

- Updated the **scrollTo**  option to accept a function [#33](https://github.com/gfranko/jquery.tocify.js/issues/33)
- Improved scroll highlighting accuracy [#33](https://github.com/gfranko/jquery.tocify.js/issues/33) [#34](https://github.com/gfranko/jquery.tocify.js/issues/34) Special thanks to [Andre Kampert](https://github.com/andrekampert) for this improvement

`1.5.0` - July 5, 2013

- Added **ignoreSelector**  option[#27](https://github.com/gfranko/jquery.tocify.js/issues/27)
- Removed the bootstrap docs.css class names [#30](https://github.com/gfranko/jquery.tocify.js/issues/30)
- Fixed a bug when there is only one selector [#31](https://github.com/gfranko/jquery.tocify.js/issues/31)

`1.4.0` - April 6, 2013

**Special thanks to [Joaquin Casares](https://github.com/joaquincasares) for helping with this release

- Fixed colon-spaced hashes [#22](https://github.com/gfranko/jquery.tocify.js/pull/22)
- Created solution for long menu's on smaller screens [#19](https://github.com/gfranko/jquery.tocify.js/issues/19)
- Fixed scroll jump bug with **extendPage** option [#20](https://github.com/gfranko/jquery.tocify.js/issues/20)
- Added the **highlightDefault** option [#21](https://github.com/gfranko/jquery.tocify.js/issues/21)
- Fixed a TOC item nesting bug [#23](https://github.com/gfranko/jquery.tocify.js/issues/23)

`1.3.0` - February 23, 2013

**Special thanks to [Mat Ryer](https://github.com/matryer) for helping with this release

- Added the **hashGenerator** option
- Fixed the pageload scroll bug [#15](https://github.com/gfranko/jquery.tocify.js/issues/15)

`1.2.0` - December 31, 2012

- Multiple bug fixes: [#8](https://github.com/gfranko/jquery.tocify.js/issues/8), [#9](https://github.com/gfranko/jquery.tocify.js/issues/9), [#11](https://github.com/gfranko/jquery.tocify.js/issues/11), [#12](https://github.com/gfranko/jquery.tocify.js/issues/12)

`1.1.0` - November 19, 2012

- **BREAKING CHANGE** : Removed the History.js logic.  All history logic is now using a hash bang instead of the HTML5 pushstate API.

-  Added the **history** option

`1.0.0` - October 7, 2012

- Fixed scrolling show/hide bug with this [page structure](https://github.com/gfranko/jquery.tocify.js/issues/6)

`0.9.0` - October 3, 2012

- Fixed another nested element show/hide bug

`0.8.0` - September 26, 2012

- Numerous bug fixes ([nested page structure bug](https://github.com/gfranko/jquery.tocify.js/issues/4), unique naming bug, show/hide bugs)

`0.7.0` - September 24, 2012

- Fixed a nested element show/hide bug

`0.6.0` - August 22, 2012

- Nested subheader element bug fixes

- Greatly improved showing/hiding deeply nested subheader elements

`0.5.0` - August 21, 2012

- Added support for Twitter Bootstrap Theming
- Added the **theme** and **extendPageOffset** options.
- Removed the **jqueryUI** option *BREAKING CHANGE*
- Updated demo page to show off new Twitter Bootstrap theming

`0.4.0` - August 19, 2012

- Added the **setOption** and **setOptions** methods
- Upgraded the CSS file
- Updated demo page

`0.3.0` - August 15, 2012

- Added the **showAndHide** option.
- Bug fixes for when the jQuery history.js plugin is not used
- Upgraded the CSS file (removed unneccessary styles, etc.)
- Upgraded to jQueryUI 1.8.23.
- Upgraded to jQuery 1.8.0.
- Upgraded demo page

`0.2.0` - July 16, 2012

- Added the **scrollTo** option.  Upgraded to jQueryUI 1.8.21.
- Multiple bug fixes.
- Upgraded the project page (included in the demos folder) to use Twitter Bootstrap.
* I will soon move the demo page into it's own separate project to create a boilerplate for documenting open source projects.

`0.1.0` - July 12, 2012

- Initial Tocify release.  Added annotated source code and documentation


## License
Copyright (c) 2012 Greg Franko  
Licensed under the MIT license.
