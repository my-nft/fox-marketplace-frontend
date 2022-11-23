import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function rankAnimation(ref) {
  return gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);

    var scrollFunctionC = {
      trigger: ".tab-content",
      toggleActions: "restart none none none",
    };

    gsap.from("td", {
      scrollTrigger: scrollFunctionC,
      opacity: 0,
      ease: "linear",
      stagger: 0.02,
    });
  }, ref);
}

export function topAnimation(ref) {

    return gsap.context(() => {

        gsap.registerPlugin(ScrollTrigger);
          var scrollFunctionA = {
              trigger: ".listElements",
              toggleActions: "restart none none none",
          };
  
          gsap.from(".listElements", {
              scrollTrigger: scrollFunctionA,
              scale: 0, rotation: 45, ease: "power4", opacity: 0.8, stagger: 0.05, x: "x-=10"
          });

          gsap.from("#foxLogo", {
            scale: 0, rotation: 45, ease: "power4", opacity: 0.8, duration: 1
        })
        
      }, ref);
}

export function popularAnimation(ref) {
  return gsap.context(() => {
    gsap.registerPlugin(ScrollTrigger);
    var scrollFunctionB = {
      trigger: ".popularItems",
      toggleActions: "restart none none none",
    };

    gsap.from(".popularItems", {
      scrollTrigger: scrollFunctionB,
      x: "x-=500",
      ease: "power4",
      opacity: 0,
      duration: 2,
      stagger: 0.25,
    });
  }, ref);
}


export const settings = {
  slidesToShow: 6,
  arrows: true,
  dots: false,
  speed: 500,
  infinite: false,
  autoplay: false,
  pauseOnHover: false,
  pauseOnFocus: false,
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
  ]
};


export const putSliderIcons = () => {
  
  const prev = document.getElementsByClassName("slick-prev")[0];
  const next = document.getElementsByClassName("slick-next")[0];

  console.log(prev);
  console.log(next);

  if(prev) {
    prev.innerHTML = "<";
  }

  if(next) {
    next.innerHTML = ">";
  }

}