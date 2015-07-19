$(function() {
	// tab handler
	$(".tabs").on("click", "> .tabs__title", function(event) {
		// remove all sibling class
		$(event.target).siblings().removeClass("selected");
		// add class
		$(event.target).addClass("selected");
	});

	// accordion handler
	$(".accordion").on("click", "> .accordion__title", function(event) {
		var activeClass = "accordion--selected";
		// remove all sibling class
		$(event.currentTarget).parent().siblings().removeClass(activeClass);
		// add class
		$(event.currentTarget).parent().addClass(activeClass);
	});

	// disable a #
	$("a[href=\"#\"]").on("click", function(event){
		event.preventDefault();
	});
});