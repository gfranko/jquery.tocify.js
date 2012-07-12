jquery.tocify.js - jQuery Table of Contents
-------------------------------------------

A jQuery plugin that dynamically generates a table of contents. Tocify can be optionally styled with **jQueryUI Themeroller**, and optionally animated with jQuery show/hide effects. Tocify also optionally provides support for **smooth scrolling**, **scroll highlighting**, **scroll page extending**, and the **HTML5 pushstate API** via [History.js](https://github.com/balupton/History.js/).

[Homepage](http://gregfranko.com/jquery.tocify.js/)

[Annotated Source Code](http://gregfranko.com/docs/jquery.tocify.html)

**Notable Features**

   - Styleable with the **jQueryUI Themeroller**

   - Supports dynamic scroll and click **jQuery show/hide effects**

   - Supports **HTML5 History pushstate API** (via History.js) for forward and back button support

   - Supports **smooth scrolling** animations

   - Supports dynamic **scroll highlighting**

   - Supports a **page extender** option to make sure a page is big enough to scroll to all table of content items

   - Passes **jsHint** with no errors

##Requirements
jQuery 1.7.2+

jQueryUI Widget Factory 1.8.20+

##Requirements
History.js 1.7.1+

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

##Change Log


`0.1.0` - July 12, 2012

- Initial Tocify release.  Added annotated source code and documentation

**Contributors**
Greg Franko

## License
Copyright (c) 2012 Greg Franko  
Licensed under the MIT license.
