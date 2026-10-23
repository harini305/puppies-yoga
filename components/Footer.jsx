import Link from "next/link";
import LogoMark from "./LogoMark";
import ButtonLink from "./ButtonLink";
import { contact, locations, nav, LIVE_SITE } from "@/lib/site";
import styles from "./Footer.module.css";

// One compact closing strip on every page: booking prompt, links, legal line.
export default function Footer() {
  const explore = nav.filter((item) => !item.href.includes("#"));
  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>See you on the mat.</h2>
          <div className="btn-row">
            {locations.map((loc, i) => (
              <ButtonLink key={loc.id} href={loc.bookUrl} variant={i === 0 ? "blush" : "outline"}>
                Book in {loc.name}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          <nav aria-label="Footer" className={styles.group}>
            <h2 className={styles.heading}>Explore</h2>
            <ul>
              {explore.map((item) => (
                <li key={item.href}>
                  <Link prefetch={false} href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.group}>
            <h2 className={styles.heading}>Say hello</h2>
            <ul>
              <li>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.base}>
          <p className={styles.legal}>
            <LogoMark className={styles.mark} />© {new Date().getFullYear()} PT Puppy Yoga Bali, in partnership with
            Aseman Bali Dog Association
          </p>
          <p>
            Design demo. Tickets and gift cards are sold on{" "}
            <a href={LIVE_SITE} target="_blank" rel="noopener noreferrer">
              puppiesyogabali.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
