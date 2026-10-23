"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Photo from "../Photo";
import ButtonLink from "../ButtonLink";
import { locations } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stones = el.querySelectorAll("[data-stone]");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // Stones drop in bottom-first, like the stacked-stones mark being built.
      tl.fromTo(
        [...stones].reverse(),
        { y: -70, autoAlpha: 0, rotate: (i) => (i % 2 ? 7 : -7) },
        { y: 0, autoAlpha: 1, rotate: 0, duration: 0.9, stagger: 0.16, ease: "back.out(1.5)" }
      ).fromTo(
        el.querySelectorAll("[data-hero-text]"),
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09 },
        0.15
      );
    });
    el.classList.add(styles.ready);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.stack}>
          <div className={`${styles.stone} ${styles.head}`} data-stone>
            <Photo name="hero-white-puppy" priority sizes="(min-width: 1100px) 180px, 30vw" />
          </div>
          <div className={`${styles.stone} ${styles.middle}`} data-stone>
            <Photo name="hero-laugh" priority sizes="(min-width: 1100px) 380px, 60vw" />
          </div>
          <div className={`${styles.stone} ${styles.base}`} data-stone>
            <Photo name="two-friends" priority sizes="(min-width: 1100px) 560px, 90vw" />
          </div>
        </div>

        <div className={styles.copy}>
          <h1 data-hero-text>Yoga, puppies, heaven.</h1>
          <p className="lead" data-hero-text>
            The original puppy yoga in Bali. A gentle hour on the mat while rescue puppies wander,
            nap and climb all over you, and every one of them is looking for a home.
          </p>
          <div className={`btn-row ${styles.ctas}`} data-hero-text>
            {locations.map((loc, i) => (
              <ButtonLink key={loc.id} href={loc.bookUrl} variant={i === 0 ? "solid" : "outline"}>
                Book in {loc.name}
              </ButtonLink>
            ))}
          </div>
          <p className={styles.aside} data-hero-text>
            Celebrating with friends?{" "}
            <Link prefetch={false} href="/private-puppy-yoga-bali" className="text-link">
              Plan a private session
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
