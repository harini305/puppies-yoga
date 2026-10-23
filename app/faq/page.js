import Faq from "@/components/Faq";
import Photo from "@/components/Photo";
import ButtonLink from "@/components/ButtonLink";
import { contact, faqGroups, locations } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = {
  title: "FAQ & contact",
  description:
    "Answers about Puppy Yoga Bali: where the rescue puppies come from, minimum age, what to bring, refunds, private sessions, and how to reach us.",
};

const slug = (title) => title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqPage() {
  return (
    <>
      <section className={styles.intro}>
        <div className="container">
          <h1>Questions &amp; answers</h1>
          <nav aria-label="FAQ topics" className={styles.topics}>
            {faqGroups.map((group) => (
              <a key={group.title} href={`#${slug(group.title)}`}>
                {group.title}
              </a>
            ))}
            <a href="#contact">Contact us</a>
          </nav>
        </div>
      </section>

      <div className={`container ${styles.groups}`}>
        {faqGroups.map((group, i) => (
          <section key={group.title} className={styles.group} aria-labelledby={slug(group.title)}>
            <h2 id={slug(group.title)}>{group.title}</h2>
            <Faq items={group.items} defaultOpen={i === 0 ? 0 : -1} />
          </section>
        ))}
      </div>

      <section className={`section ${styles.contact}`} aria-labelledby="contact">
        <div className={`container ${styles.contactGrid}`}>
          <div className={styles.contactCopy}>
            <h2 id="contact">Still wondering about something?</h2>
            <p className="lead">
              Message us about bookings, the waiting list, private sessions or the puppies. WhatsApp is the
              quickest way to reach the team.
            </p>
            <div className="btn-row">
              <ButtonLink href={contact.whatsappUrl}>
                WhatsApp {contact.whatsappDisplay}
              </ButtonLink>
              <ButtonLink href={`mailto:${contact.email}`} variant="outline">
                Email us
              </ButtonLink>
            </div>
            <dl className={styles.channels}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  {", "}
                  <a href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                    TikTok
                  </a>
                </dd>
              </div>
              {locations.map((loc) => (
                <div key={loc.id}>
                  <dt>{loc.name}</dt>
                  <dd>
                    {loc.venue}, {loc.address}
                  </dd>
                </div>
              ))}
              <div>
                <dt>Adoption &amp; shelter visits</dt>
                <dd>
                  Aseman Bali Dog Association,{" "}
                  <a href={contact.asemanWhatsappUrl} target="_blank" rel="noopener noreferrer">
                    WhatsApp {contact.asemanWhatsappDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <Photo name="pool-hug" sizes="(min-width: 900px) 35vw, 100vw" className={styles.contactImg} />
        </div>
      </section>
    </>
  );
}
