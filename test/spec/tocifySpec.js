describe("Tocify jQuery Plugin", function () {

    var toc;

	beforeEach(function() {

        loadFixtures("tocifyFixture.html");

        toc = $("#toc").tocify({ context: ".documentation", selectors: "h1, h3, h4" });

	});

	describe("Generating the table of contents", function() {

        it("should show all headers", function() {

            expect($(".header")).toBeVisible();

        });

        it("should hide all subheaders", function() {

            expect($(".sub-header")).toBeHidden();

        });

    });

    describe("Table of Contents Event Handlers", function() {

        it("should show all first-level child subheaders when a header class item is clicked", function() {

            $(".header").first().click();

            //expect($(".header").children(".subHeader")).toBeVisible();

        });
    
    });

    describe("Hash generation", function(){

        it("Should add an index if there are duplicate values", function(){

            loadFixtures("tocifyFixture.html");

            // set all H1s to the same text
            $("h1").text("The same value");

            toc = $("#toc").tocify({ hashGenerator: "pretty", context: ".documentation", selectors: "h1, h3, h4" });

            expect($("h1.getting-started-test-marker").eq(0).prev("div").eq(0).attr("name")).toBe("the-same-value3");

        });

        it("Should default to 'original'", function(){
            expect(toc.data("tocify").options["hashGenerator"]).toBe("compact");
        });

        it("Should support the 'pretty' hashGenerator option", function(){

            loadFixtures("tocifyFixture.html");
            toc = $("#toc").tocify({ hashGenerator: "pretty", context: ".documentation", selectors: "h1, h3, h4" });
            expect($("h1.getting-started-test-marker").eq(0).prev("div").eq(0).attr("name")).toBe("getting-started");

        });

        it("Should fix double hyphens in the 'pretty' hashGenerator option", function(){

            loadFixtures("tocifyFixture.html");
            $("h1.getting-started-test-marker").text("Getting    started")
            toc = $("#toc").tocify({ hashGenerator: "pretty", context: ".documentation", selectors: "h1, h3, h4" });
            expect($("h1.getting-started-test-marker").eq(0).prev("div").eq(0).attr("name")).toBe("getting-started");

        });

        it("Should support a function hashGenerator option", function(){

            loadFixtures("tocifyFixture.html");
            var args = [];

            toc = $("#toc").tocify({ hashGenerator: function(text, element){

                // record this call
                args.push(arguments);

                // return a test value
                return text + "(TEST)";

            }, context: ".documentation", selectors: "h1, h3, h4" });
      
            expect($("h1.getting-started-test-marker").eq(0).prev("div").eq(0).attr("name")).toBe($("h1.getting-started-test-marker").text() + "(TEST)");
            
            // check the correct arguments were passed to the function too

            // text
            expect(args[0][0], $("h1.getting-started-test-marker").text());

            // element
            expect(args[0][1].attr("class"), "getting-started-test-marker");

        });

    });

});