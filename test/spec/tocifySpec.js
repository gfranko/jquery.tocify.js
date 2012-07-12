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


});