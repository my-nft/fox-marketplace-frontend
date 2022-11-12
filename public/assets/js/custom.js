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

}
