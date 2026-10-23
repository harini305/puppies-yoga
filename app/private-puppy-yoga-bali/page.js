import Photo from "@/components/Photo";
import ButtonLink from "@/components/ButtonLink";
import GiftCardPreview from "@/components/GiftCardPreview";
import ScrollFx from "@/components/ScrollFx";
import { contact } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Private sessions & gift cards",
  description:
    "Book a private puppy yoga session in Bali for birthdays, retreats and milestones, for up to 19 guests, or give a Puppy Yoga Bali gift card.",
};

const included = [
  "The session is yours alone, for up to 19 guests",
  "Extra cuddle time with the puppies",
  "Pool access at the venue",
  "Made for birthdays, milestones and retreats",
];

export default function PrivatePage() {
  return (
    <>
      <section className={`on-dark ${styles.hero}`} aria-labelledby="private-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 id="private-title">The heaven of puppy yoga, just for your people.</h1>
            <p className="lead">
              Exclusive. Intimate. Unforgettable. Celebrate something big, or simply enjoy the puppies with
              no one else on the mat.
            </p>
            <div className="btn-row">
              <ButtonLink href={contact.whatsappUrl} variant="blush">
                Ask on WhatsApp
              </ButtonLink>
              <a href="#gift-cards" className="btn btn--outline">
                Gift cards
              </a>
            </div>
          </div>
          <ScrollFx effect="reveal" className={styles.collage}>
            <div className={styles.c1} data-fx-item>
              <Photo name="garden-pair" priority sizes="(min-width: 900px) 26vw, 50vw" />
            </div>
            <div className={styles.c2} data-fx-item>
              <Photo name="puppy-kisses" priority sizes="(min-width: 900px) 22vw, 45vw" />
            </div>
            <div className={styles.c3} data-fx-item>
              <Photo name="jungle-cuddle" sizes="(min-width: 900px) 22vw, 45vw" />
            </div>
          </ScrollFx>
        </div>
      </section>

      <section className="section" aria-labelledby="details-title">
        <div className={`container ${styles.details}`}>
          <div>
            <h2 id="details-title">What a private session includes</h2>
            <ul className={styles.included}>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className={styles.priceBox} aria-label="Price and booking">
            <p className={styles.priceLabel}>From around</p>
            <p className={styles.price}>IDR 8.5 million</p>
            <p className="muted">
              Depending on the season. Shared within a group, it can be surprisingly good value.
            </p>
            <ul className={styles.terms}>
              <li>Payment is due 3 days in advance.</li>
              <li>50% of profits go directly to Aseman Bali Dog Association.</li>
            </ul>
            <div className="btn-row">
              <ButtonLink href={contact.whatsappUrl}>Plan it on WhatsApp</ButtonLink>
              <ButtonLink href={contact.instagram} variant="outline">
                DM us on Instagram
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className={`section ${styles.gifts}`} aria-labelledby="gift-cards">
        <div className="container">
          <div className="section-head">
            <h2 id="gift-cards">Give an hour of puppy cuddles</h2>
            <p className="lead">
              Gift cards can be sent to someone else or kept for yourself, with a delivery date and a
              personal message. Try a preview below.
            </p>
          </div>
          <GiftCardPreview />
        </div>
      </section>
    </>
  );
}
