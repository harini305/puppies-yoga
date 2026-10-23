"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LogoMark from "./LogoMark";
import { nav, locations, contact } from "@/lib/site";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build the menu timeline once; reduced motion gets an instant toggle.
  useEffect(() => {
    const panel = panelRef.current;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ paused: true });
      tl.set(panel, { visibility: "visible" });
      if (reduce) {
        tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 });
      } else {
        tl.fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }
        ).from(
          panel.querySelectorAll("[data-menu-item]"),
          // opacity (not autoAlpha) keeps links focusable while they animate in
          { y: 24, opacity: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          "-=0.15"
        );
      }
      tlRef.current = tl;
    }, panel);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      // Make the panel focusable before the first animation frame, then move focus into it.
      gsap.set(panelRef.current, { visibility: "visible" });
      tl.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      panelRef.current?.querySelector("a")?.focus({ preventScroll: true });
    } else {
      tl.timeScale(1.6).reverse();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Expose the footer's height as --footer-h so a closing section can fill the screen above it.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() => root.style.setProperty("--footer-h", `${footer.offsetHeight}px`));
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  // Links to the page you're already on go back to its top (Next.js keeps the scroll
  // position for same-URL links). Any link in the mobile menu also closes it.
  useEffect(() => {
    // Capture phase: Next.js <Link> calls preventDefault() during the normal click.
    const onClick = (e) => {
      const link = e.target.closest?.("a[href]");
      if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || link.target === "_blank") return;
      if (panelRef.current?.contains(link)) setOpen(false);
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && !url.hash) {
        requestAnimationFrame(() => window.scrollTo({ top: 0 }));
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1100px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const isCurrent = (href) => !href.includes("#") && pathname === href;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link prefetch={false} href="/" className={styles.brand} aria-label="Puppy Yoga Bali, home">
          <LogoMark className={styles.mark} />
          <span className={styles.wordmark}>Puppy Yoga Bali</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} prefetch={false}
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link prefetch={false} href="/sessions#book" className={`btn ${styles.book}`}>
            Book<span className={styles.bookLong}>&nbsp;a session</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.toggleLines} data-open={open} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`on-dark ${styles.panel}`}
        inert={!open}
      >
        <nav className={`container ${styles.panelInner}`} aria-label="Mobile">
          <ul className={styles.panelLinks}>
            <li data-menu-item>
              <Link prefetch={false} href="/" aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href} data-menu-item>
                <Link prefetch={false} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.panelBook} data-menu-item>
            <p>Book a group session</p>
            <div className="btn-row">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={loc.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--light"
                >
                  {loc.name}
                  <span className="visually-hidden"> (opens booking page in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
          <p className={styles.panelContact} data-menu-item>
            Questions?{" "}
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              WhatsApp {contact.whatsappDisplay}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
