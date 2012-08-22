/* jquery Tocify - v0.5.0 - 2012-08-21
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2012 Greg Franko; Licensed MIT */

// Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) that calls another IIFE that contains all of the plugin logic.  I used this pattern so that anyone viewing this code would not have to scroll to the bottom of the page to view the local parameters that were passed to the main IIFE.
(function(tocify) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
    tocify(jQuery, window, document);

}

// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.
(function($, window, document, undefined) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calling the jQueryUI Widget Factory Method
    $.widget("toc.tocify", {

        //Plugin version
        version: "0.5.0",

        // These options will be used as defaults
        options: {

            // **context**: Accepts String: Any jQuery selector
            // The container element that holds all of the elements used to generate the table of contents
            context: "body",

            // **selectors**: Accepts an Array of Strings: Any jQuery selectors
            // The element's used to generate the table of contents.  The order is very important since it will determine the table of content's nesting structure
            selectors: "h1, h2, h3",

            // **showAndHide**: Accepts a boolean: true or false
            // Used to determine if elements should be shown and hidden
            showAndHide: true,

            // **showEffect**: Accepts String: "none", "fadeIn", "show", or "slideDown"
            // Used to display any of the table of contents nested items
            showEffect: "slideDown",

            // **showEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the show animation
            showEffectSpeed: "medium",

            // **hideEffect**: Accepts String: "none", "fadeOut", "hide", or "slideUp"
            // Used to hide any of the table of contents nested items
            hideEffect: "slideUp",

            // **hideEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the hide animation
            hideEffectSpeed: "medium",

            // **smoothScroll**: Accepts a boolean: true or false
            // Determines if a jQuery animation should be used to scroll to specific table of contents items on the page
            smoothScroll: true,

            // **smoothScrollSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            // The time duration of the smoothScroll animation
            smoothScrollSpeed: "medium",

            // **scrollTo**: Accepts Number (pixels)
            // The amount of space between the top of page and the selected table of contents item after the page has been scrolled
            scrollTo: 0,

            // **showAndHideOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be shown and hidden while scrolling
            showAndHideOnScroll: true,

            // **highlightOnScroll**: Accepts a boolean: true or false
            // Determines if table of contents nested items should be highlighted (set to a different color) while scrolling
            highlightOnScroll: true,

            // **highlightOffset**: Accepts a number
            // The offset distance in pixels to trigger the next active table of contents item
            highlightOffset: 40,

            // **theme**: Accepts a string: "twitterBootstrap", "jqueryUI", or "none"
            // Determines if Twitter Bootstrap, jQueryUI, or Tocify classes should be added to the table of contents
            theme: "twitterBootstrap",

            // **extendPage**: Accepts a boolean: true or false
            // If a user scrolls to the bottom of the page and the page is not tall enough to scroll to the last table of contents item, then the page height is increased
            extendPage: true,

            // **extendPageOffset**: Accepts a number: pixels
            // How close to the bottom of the page a user must scroll before the page is extended
            extendPageOffset: true
        },

        // _Create
        // -------
        //      Constructs the plugin.  Only called once.
        _create: function() {

            // Generates the HTML for the dynamic table of contents
            this._generateToc();

            // Adds jQuery event handlers to the newly generated table of contents
            this._setEventHandlers();

            // Adds CSS classes to the newly generated table of contents HTML
            this._addCSSClasses();

        },

        // _generateToc
        // ------------
        //      Generates the HTML for the dynamic table of contents
        _generateToc: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // All of the HTML tags found within the context provided (i.e. body) that match the top level jQuery selector above
                firstElem,

                // Instantiated variable that will store the top level newly created unordered list DOM element
                ul,

                // Instantiated variable that will store a header DOM element
                previousHeader;

             // If the selectors option has a comma within the string
             if(this.options.selectors.indexOf(",") !== -1) {

                 // Grabs the first selector from the string
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0, this.options.selectors.indexOf(",")));

             }

             // If the selectors option does not have a comman within the string
             else {

                 // Grabs the first selector from the string and makes sure there are no spaces
                 firstElem = $(this.options.context).find(this.options.selectors.replace(/ /g,""));

             }

            // Loops through each top level selector
            firstElem.each(function(index) {

                // Creates an unordered list HTML element and adds a dynamic ID and standard class name
                ul = $("<ul/>", {
                    "id": "Header" + index,
                    "class": "header"
                }).

                // Appends a top level list item HTML element to the previously created HTML header
                append(self._nestElements($(this), index));

                // Add the created unordered list element to the HTML element calling the plugin
                self.element.append(ul);

                // Adds all of the HTML tags within each top level selector to an array
                $(this).nextUntil(this.nodeName.toLowerCase()).filter(self.options.selectors).each(function(index, selector) {

                        // Finds the previous header DOM element
                        previousHeader = $(this).prevAll(self.options.selectors).first();

                        // If the current header DOM element is smaller than the previous header DOM element
                        if(+$(this)[0].tagName.charAt(1) < +previousHeader[0].tagName.charAt(1)) {

                            // Selects the last unordered list HTML found within the HTML element calling the plugin
                            self.element.find(".sub-header").last().after(self._nestElements($(this), index));

                        }

                        // If the current header DOM element is the same type of header(eg. h4) as the previous header DOM element
                        else if(+$(this)[0].tagName.charAt(1) === +previousHeader[0].tagName.charAt(1)) {

                            ul.find(".item").last().after(self._nestElements($(this), index));

                        }

                        else {

                            // Selects the last unordered list HTML found within the HTML element calling the plugin
                            ul.find(".item").last().

                            // Appends an unorderedList HTML element to the dynamic `unorderedList` variable and sets a common class name
                            after($("<ul/>", {
                                "class": "sub-header"
                            })).next(".sub-header").

                            // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
                            append(self._nestElements($(this), index));
                        }

                });

            });

        },

        // _nestElements
        // -------------
        //      Helps create the table of contents list and adds div "anchors" to the page
        _nestElements: function(self, index) {

            // Appends a list item HTML element to the last unordered list HTML element found within the HTML element calling the plugin
            var item = $("<li/>", {

                // Sets a common class name to the list item
                "class": "item",

                // Sets the list item's HTML5 data attribute, `data-href`, to the currently traversed HTML element (also making sure that all whitespace is replaced with an underscore)
                "data-href": self.text().replace(/\s/g, ""),

                "data-unique": (self.text() + index).replace(/\s/g, "")

            }).append($("<a/>", {

                "href": "javascript:;",

                "text": self.text()

            }));

            // Adds an HTML anchor tag before the currently traversed HTML element
            self.before($("<div/>", {

                // Sets a name attribute on the anchor tag to the text of the currently traversed HTML element (also making sure that all whitespace is replaced with an underscore)
                "name": self.text().replace(/\s/g, ""),

                "data-unique": (self.text() + index).replace(/\s/g, "")

            }));

            return item;

        },

       // _setEventHandlers
        // ----------------
        //      Adds jQuery event handlers to the newly generated table of contents
        _setEventHandlers: function() {

            // _Local variables_

            // Stores the plugin context in the self variable
            var self = this,

                // Instantiates a new variable that will be used to hold a specific element's context
                $self,

                // Instantiates a new variable that will be used to determine the smoothScroll animation time duration
                duration;

            // Event delegation that looks for any clicks on list item elements inside of the HTML element calling the plugin
            this.element.on("click.tocify", "li", function(event) {

                // If the History.js plugin has been included on the page
                if(window.History && window.History.Adapter) {

                    // Adds a new state and url to the history
                    window.History.pushState(null, $(this).attr("data-href"), "?" + $(this).attr("data-href"));

                }

                // Removes highlighting from all of the list item's
                $("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                $(this).addClass(self.focusClass);

                // If the History.js plugin has not been included on the page
                if(!window.History && (window.History && !window.History.Adapter) && self.options.showAndHide) {

                    // Show the all of the sub-headers within the current header
                    self.show($(this).closest(".header").find(".sub-header"));

                }

                // Saves the currently clicked list item's context in the `$self` variable
                $self = $(this);

                // If the `smoothScroll` option is true
                if (self.options.smoothScroll) {
                    
                    // Sets the `duration` local variable to the `smoothScrollSpeed` option
                    duration = self.options.smoothScrollSpeed;
                    
                }

                else {

                    // Sets the `duration` local variable to 0
                    duration = 0;

                }

                // Animates the html and body element scrolltops
                $("html, body").animate({

                    // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-href` tag
                    "scrollTop": $('div[data-unique="' + $self.attr("data-unique") + '"]').offset().top - self.options.scrollTo + "px"
                        
                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

                // Animates the table of contents scrolltop
                self.element.animate({

                    // Sets the jQuery `scrollTop` to the top offset of the current HTML li tag
                    "scrollTop": $self.offset().top + "px"
                        
                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

            });

            // Mouseenter and Mouseleave event handlers for the list item's within the HTML element calling the plugin
            this.element.find("li").on({

                // Mouseenter event handler
                "mouseenter.tocify": function() {

                    // Adds a hover CSS class to the current list item
                    $(this).addClass(self.hoverClass);

                    // Makes sure the cursor is set to the pointer icon
                    $(this).css("cursor", "pointer");

                },

                // Mouseleave event handler
                "mouseleave.tocify": function() {

                    if(self.options.theme !== "twitterBootstrap") {

                        // Removes the hover CSS class from the current list item
                        $(this).removeClass(self.hoverClass);

                    }

                }
            });

            // Window scroll event handler
            $(window).on("scroll.tocify", function() {

                // Once all animations on the page are complete, this callback function will be called
                $("html, body").promise().done(function() {

                    // Local variables

                    // Stores how far the user has scrolled
                    var winScrollTop = $(window).scrollTop(),

                        // Stores the height of the window
                        winHeight = $(window).height(),

                        // Stores the height of the document
                        docHeight = $(document).height(),

                        scrollHeight = $("body")[0].scrollHeight,

                        // Instantiates a variable that will be used to hold a selected HTML element
                        elem,

                        lastElemOffset;

                    if(self.options.extendPage) {

                        // If the user has scrolled to the bottom of the page and the last toc item is not focused
                        if(($.browser.webkit && winScrollTop >= scrollHeight - winHeight - self.options.extendPageOffset) || (!$.browser.webkit && winHeight + winScrollTop > docHeight - self.options.extendPageOffset)) {

                            self.element.scrollTop(winScrollTop);

                            if(!$(".tocify-extend-page").length) {

                                // Gets the top offset of the page header that is linked to the last toc item
                                lastElemOffset = $('div[data-unique="' + $(".item").last().attr("data-unique") + '"]').offset().top;

                                // Appends a div to the bottom of the page and sets the height to the difference of the window scrollTop and the last element's position top offset
                                $(self.options.context).append($("<div />", {

                                    "class": "tocify-extend-page",

                                    "height": Math.abs(lastElemOffset - winScrollTop) + "px"

                                }));

                            }

                        }

                    }

                    // The zero timeout ensures the following code is run after the scroll events
                    setTimeout(function() {

                        // Loops through each anchor tag on the page with a `name` attribute
                        $(self.options.context).find("div[data-unique]").next().each(function() {

                            // If the user has scrolled to within x (the highlightOffset option) distance of the currently traversed anchor tag
                            if ((Math.abs($(this).offset().top - winScrollTop) < self.options.highlightOffset)) {

                                // Stores the list item HTML element that corresponds to the currently traversed anchor tag
                                elem = $('li[data-unique="' + $(this).prev("div[data-unique]").attr("data-unique") + '"]');

                                // If the `highlightOnScroll` option is true and a next element is found
                                if(self.options.highlightOnScroll && elem.length) {

                                    // Removes highlighting from all of the list item's
                                    $("." + self.focusClass).removeClass(self.focusClass);

                                    // Highlights the corresponding list item
                                    elem.addClass(self.focusClass);

                                }

                                // If the `showAndHideOnScroll` option is true
                                if(self.options.showAndHideOnScroll && self.options.showAndHide) {

                                     // If the current element's parent is a header element
                                     if(elem.parent().hasClass("header")) {


                                         // Shows the next sub-header element
                                         self.show(elem.next(".sub-header"));

                                     }

                                     // If the current element's parent is a subheader element
                                     else if(elem.parent().hasClass("sub-header")) {
 
                                         // Shows the parent sub-header element
                                         self.show(elem.parent());

                                     }
                                 }

                                 return false;

                            }

                        });

                    }, 0);

                });

            });

            // If the History.js plugin has been included on the page
            if(window.History && window.History.Adapter && self.options.showAndHide) {

                // Binds to the StateChange Event
                window.History.Adapter.bind(window,'statechange',function() {

                    // The list item that corresponds to the state change
                    var elem = $('li[data-href="' + window.History.getState().title + '"]');

                    if(elem.next(".sub-header").length || elem.parent().is(".header")) {

                        // Show the all of the sub-headers within the current header
                        self.show(elem.next(".sub-header"));

                    }

                });

            }

        },

        // Show
        // ----
        //      Opens the current sub-header
        show: function(elem) {

            // Stores the plugin context in the `self` variable
            var self = this;

            // If the sub-header is not already visible
            if (!elem.is(":visible")) {

                //Determines what jQuery effect to use
                switch (self.options.showEffect) {

                    //Uses `no effect`
                    case "none":

                        elem.show();

                    break;

                    //Uses the jQuery `show` special effect
                    case "show":

                        elem.show(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `slideDown` special effect
                    case "slideDown":
        
                        elem.slideDown(self.options.showEffectSpeed);

                    break;

                    //Uses the jQuery `fadeIn` special effect
                    case "fadeIn":

                        elem.fadeIn(self.options.showEffectSpeed);

                    break;

                    //If none of the above options were passed, then a `jqueryUI show effect` is expected
                    default:

                        elem.show();

                    break;

                }

                // Hides all non-active sub-headers
                self.hide($(".sub-header").not(elem.closest(".header").find(".sub-header")));

            }

            // Maintains chainablity
            return this;
        },

        // Hide
        // ----
        //      Closes the current sub-header
        hide: function(elem) {

            // Stores the plugin context in the `self` variable
            var self = this;

            // If the sub-header is already hidden
            if (elem.is(":visible")) {

                //Determines what jQuery effect to use
                switch (self.options.hideEffect) {

                    //Uses `no effect`
                    case "none":

                        elem.hide();

                    break;

                    //Uses the jQuery `hide` special effect 
                    case "hide":

                        elem.hide(self.options.hideEffectSpeed);

                    break;

                    //Uses the jQuery `slideUp` special effect
                    case "slideUp":

                        elem.slideUp(self.options.hideEffectSpeed);

                    break;

                    //Uses the jQuery `fadeOut` special effect
                    case "fadeOut":

                        elem.fadeOut(self.options.hideEffectSpeed);

                    break;

                    //If none of the above options were passed, then a `jqueryUI hide effect` is expected
                    default:

                        elem.hide();

                    break;
                }
            }

            // Maintains chainablity
            return this;
        },

        // _addCSSClasses
        // --------------
        //      Adds CSS classes to the newly generated table of contents HTML
        _addCSSClasses: function() {

            // If the user wants a jqueryUI theme
            if(this.options.theme === "jqueryUI") {

                this.focusClass = "ui-state-default";

                this.hoverClass = "ui-state-hover";

                //Adds the default styling to the dropdown list
                this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content");

            }

            // If the user wants a twitterBootstrap theme
            else if(this.options.theme === "twitterBootstrap") {

                this.element.addClass("bs-docs-sidebar").find(".header, .sub-header").addClass("nav nav-list bs-docs-sidenav");

                this.focusClass = "active";

            }

            // If a user does not want a prebuilt theme
            else {

                // Adds more neutral classes (instead of jqueryUI)

                this.focusClass = "tocify-focus";

                this.hoverClass = "tocify-hover";

            }

            //Maintains chainability
            return this;

        },

        // setOption
        // ---------
        //      Sets a single Tocify option after the plugin is invoked
        setOption: function() {

            // Calls the jQueryUI Widget Factory setOption method
            $.Widget.prototype._setOption.apply(this, arguments);

        },

        // setOptions
        // ----------
        //      Sets a single or multiple Tocify options after the plugin is invoked
        setOptions: function() {

            // Calls the jQueryUI Widget Factory setOptions method
            $.Widget.prototype._setOptions.apply(this, arguments);

        }

    });

})); //end of plugin

