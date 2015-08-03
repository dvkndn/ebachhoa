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

	// category select handler
	$(".sell-category-list__item").on("click", function(event) {
		var activeClass = "selected";
		// remove all sibling class
		$(event.currentTarget).siblings().removeClass(activeClass);
		// remove all next
		$(event.currentTarget).parent().parent().nextAll().children().children().removeClass(activeClass);
		// add class
		$(event.currentTarget).addClass(activeClass);
	});

	// inbox folder handler
	$(".folder").on("click", "> .folder__title", function(event) {
		console.log(event);
		// remove all sibling class
		$(event.currentTarget).parent().siblings().removeClass("expanded selected accordion--selected");
		// add class
		if ($(event.currentTarget).parent().hasClass("accordion")) {
			$(event.currentTarget).parent().addClass("expanded");
		} else {
			$(event.currentTarget).parent().addClass("selected");
		};
	});

	// general selector
	$(".selector").on("click", "> *", function(event) {
		$(event.currentTarget).siblings().removeClass("selected");
		$(event.currentTarget).addClass("selected");
	});

	// remove row button
	$(".table__remove-row-btn").on("click", function(event) {
		$row = $(event.currentTarget).parent().parent();
		$row.hide("slow", function(){ $row.remove(); });
	});
});