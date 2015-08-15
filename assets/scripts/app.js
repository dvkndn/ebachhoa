$(function() {
	// set money format
	if (accounting) {
		accounting.settings = {
			currency: {
				symbol: "₫",   // default currency symbol is '$'
				format: "%v %s", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal : ",",  // decimal point separator
				thousand: ".",  // thousands separator
				precision: 0   // decimal places
			},
			number: {
				precision : 0,  // default precision on numbers is 0
				thousand: ".",
				decimal : ","
			}
		}
	};

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
		$row.remove();
		updateCart(event);
	});

	// update cart
	var updateCart = function(event) {
		var total = 0;

		$.each($(".cart-page__list tbody tr"), function(index, tr) {
			var amount = $(tr).children("*:nth-child(2)").children("input").val();
			amount = Number(amount)

			var price  = $(tr).children("*:nth-child(3)").text();
			price = Number(price.replace(/[^0-9]+/g,""));

			var totalPrice = amount*price;
			total += totalPrice;
			totalPrice = accounting.formatMoney(totalPrice);

			$(tr).children("*:nth-child(4)").text(totalPrice);
		});

		$(".cart-summary__total-price").text(accounting.formatMoney(total));
	};
	// $("#update-cart-btn").on("click", updateCart);
	$(".text-box--cart-amount").on("blur", updateCart);

	// home slider
	$(".slider__slides").slick({
		arrows: false
		// autoplay: true,
		// autoplaySpeed: 2000
	});
	$(".slider__thumb").on("click", function(e) {
		var index = $(e.target).index();
		$(".slider__slides").slick("slickGoTo", index)
	});

	// checkout 2 option handler
	if ($(".checkout-page__payment-form").length) {

		$("#nganluong-fieldset").hide();
		$("#cod-fieldset").hide();

		$("#radio-payment-cod").on("change", function(e) {
			$("#card-fieldset").hide();
			$("#nganluong-fieldset").hide();
			$("#cod-fieldset").show();
		});
		$("#radio-payment-nganluong").on("change", function(e) {
			$("#card-fieldset").hide();
			$("#nganluong-fieldset").show();
			$("#cod-fieldset").hide();
		});
		$("#radio-payment-card").on("change", function(e) {
			$("#card-fieldset").show();
			$("#nganluong-fieldset").hide();
			$("#cod-fieldset").hide();
		});
	};

	// dashboard buy option handler
	$("#deal-over-section").hide();
	$("#deal-over").on("change", function(e) {
		$("#deal-now-section").hide();
		$("#deal-over-section").show();
	});
	$("#deal-now").on("change", function(e) {
		$("#deal-now-section").show();
		$("#deal-over-section").hide();
	});	

	// product circle processbar
	if ($(".product-deadline__circle").length) {
		var states = [
			{
				value: 0,
				fill: { color: "#E2F0D9" },
				emptyFill: "#70AD47"
			}, {
				value: 0.25,
				fill: { color: "#E2F0D9" },
				emptyFill: "#70AD47"
			}, {
				value: 0,
				fill: { color: "#F8CBAD" },
				emptyFill: "#FF6601"
			}, {
				value: 0.25,
				fill: { color: "#F8CBAD" },
				emptyFill: "#FF6601"
			}, {
				value: 0,
				fill: { color: "#FFAFAF" },
				emptyFill: "#FF0000"
			}, {
				value: 0.25,
				fill: { color: "#FFAFAF" },
				emptyFill: "#FF0000"
			}
		];
		var currentState = 0;
		$(".product-deadline__circle").circleProgress({
			value: 0.25,
			size: 240,
			startAngle: -Math.PI / 4 * 2,
			fill: { color: "#E2F0D9" },
			emptyFill: "#70AD47",
			thickness: 8
		});
		$(".product-deadline__circle").on("click", function(e) {
			currentState = (currentState === 5 ? 0 : currentState + 1);
			$(e.currentTarget).circleProgress(states[currentState]);
		})
	};
});