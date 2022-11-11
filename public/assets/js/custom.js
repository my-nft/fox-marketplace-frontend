/**
 * PreloaD
 */

var preLoder = $("#preloader");

$(window).on("load", function () {

	/*---------------------
		Preloader
	-----------------------*/

	gsap.from("#logoPreload", {
		scale: 1.2,
		rotation: 360,
		ease: "power4",
		opacity: 1,
		duration: 5,
	});

	preLoder.addClass("hide");


	sliderInit();
});


function sliderInit() {
	$(".slider").mouseover(function () {
		$(".slick-prev").css("opacity", 1);
		$(".slick-next").css("opacity", 1);
	});
	$(".slider").mouseout(function () {
		$(".slick-prev").css("opacity", 0);
		$(".slick-next").css("opacity", 0);
	});

	var gallery = $(".slide a");

	$(".slide a").on("click", function (e) {
		setButton();
		e.preventDefault();

		var totalSlides = +$(this).parents(".slider").slick("getSlick").slideCount,
			dataIndex = +$(this).parents(".slide").data("slick-index"),
			trueIndex;
		switch (true) {
			case dataIndex < 0:
				trueIndex = totalSlides + dataIndex;
				break;
			case dataIndex >= totalSlides:
				trueIndex = dataIndex % totalSlides;
				break;
			default:
				trueIndex = dataIndex;
		}

		$.fancybox.open(gallery, {}, trueIndex);
		return false;
	});

	$(".slider").slick({
		slidesToShow: 6,
		arrows: true,
		dots: false,
		speed: 500,
		autoplay: false,
		pauseOnHover: false,
		pauseOnFocus: false,
		cssEase: "ease-in",
		autoplaySpeed: 0,

		customPaging: function () {
			return "";
		},
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 5,
				},
			},
			
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	function resizedw() {
		$(".slider").slick("unslick");

		$(".slider").slick({
			slidesToShow: 6,
			arrows: true,
			dots: false,
			speed: 500,
			autoplay: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			cssEase: "ease-in",
			autoplaySpeed: 0,
			customPaging: function () {
				return "";
			},
			responsive: [
				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 5,
					},
				},
				
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
					},
				},
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
					},
				},
			],
		});

		setButton();
	}
	let doit;
	window.onresize = function () {
		clearTimeout(doit);
		doit = setTimeout(resizedw, 1000);
	};

	function setButton() {
		$(".slick-prev").html("<");
		$(".slick-next").html(">");
	}
	setButton();
}
