"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Scroll-driven effects. Content is fully visible without JS or with reduced motion.
  - "reveal": children marked [data-fx-item] unmask in a short stagger when the block enters.
  - "parallax": children marked [data-parallax="<px>"] drift vertically while scrolling.
  - "drift": the [data-fx-track] element slides horizontally as the section passes (desktop only).
*/
export default function ScrollFx({ effect, as: Tag = "div", className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (effect === "reveal") {
        gsap.fromTo(
          el.querySelectorAll("[data-fx-item]"),
          { clipPath: "inset(18% 0% 0% 0% round 18px)", y: 40, autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      }

      if (effect === "parallax") {
        el.querySelectorAll("[data-parallax]").forEach((node) => {
          const dist = Number(node.dataset.parallax) || 40;
          gsap.fromTo(
            node,
            { y: dist },
            {
              y: -dist,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        });
      }
    });

    if (effect === "drift") {
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const track = el.querySelector("[data-fx-track]");
        el.dataset.drifting = "true";
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => {
              const cs = getComputedStyle(el);
              const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
              return Math.min(0, inner - track.scrollWidth);
            },
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
        return () => delete el.dataset.drifting;
      });
    }

    return () => mm.revert();
  }, [effect]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
