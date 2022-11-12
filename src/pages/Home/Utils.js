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
