$(function() {
	// tab handler
	$(".tabs").on("click", ".tabs__title", function(event) {
		// remove all sibling class
		$(event.target).siblings().removeClass("selected");
		// add class
		$(event.target).addClass("selected");
	});
});