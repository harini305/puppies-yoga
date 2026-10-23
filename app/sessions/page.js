import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import BookingPicker from "@/components/BookingPicker";
import Photo from "@/components/Photo";
import ScrollFx from "@/components/ScrollFx";
import { contact } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Sessions & booking",
  description:
    "What to expect at a Puppy Yoga Bali group session in Canggu or Ubud: a gentle 60-minute yoga class with rescue puppies. Choose a location and book.",
};

const flow = [
  {
    stage: "Before",
    title: "Arrive a little early",
    text: "Someone from the team meets you and shows you to your mat. Wear a T-shirt: the puppies love climbing on backs.",
  },
  {
    stage: "During",
    title: "Flow, gently",
    text: "A beginner-friendly yoga class while rescue puppies roam, play and fall asleep wherever they like. Usually on you.",
  },
  {
    stage: "After",
    title: "Fall in love, maybe",
    text: "Every puppy is open for adoption through Aseman Bali Dog Association. Ask us and we'll put you in touch.",
  },
];

const goodToKnow = [
  { title: "Everything is provided", text: "Yoga mat, welcome drink and towels if you need them." },
  { title: "Minimum age 16", text: "For safety. ID may be requested, and there's no refund for underage guests." },
  { title: "No outside dogs", text: "Only puppies from our rescue partner join the sessions." },
  { title: "48-hour changes", text: "Cancel at least 48 hours ahead for a refund or one reschedule." },
  {
    title: "Sold out?",
    text: "Sessions usually sell out a few days ahead. Message us on WhatsApp to join the waiting list.",
    link: { href: contact.whatsappUrl, label: "Join the waiting list" },
  },
  { title: "Booked through an app?", text: "If you booked via GetYourGuide or another app, contact them for changes." },
];

export default function SessionsPage() {
  return (
    <>
      <PageIntro
        title="An hour on the mat, with company."
        lead="Group sessions last 60 minutes and suit every level, from first-timers to daily yogis. The puppies set the pace."
        image="pool-flow"
      >
        <a href="#book" className="btn">
          Choose a location
        </a>
      </PageIntro>

      <section className={`section on-dark ${styles.flowSection}`} aria-labelledby="flow-title">
        <div className="container">
          <div className="section-head">
            <h2 id="flow-title">How a session goes</h2>
          </div>
          <ol className={styles.flow}>
            {flow.map((step) => (
              <li key={step.stage}>
                <span className={styles.stage}>{step.stage}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="book">
        <div className="container">
          <div className="section-head">
            <h2 id="book">Choose your location</h2>
            <p className="lead muted">Same rescue puppies, two settings. Pick one to see the details.</p>
          </div>
          <BookingPicker />
        </div>
      </section>

      <section className={`section ${styles.knowSection}`} aria-labelledby="know-title">
        <div className={`container ${styles.knowGrid}`}>
          <div className={styles.knowIntro}>
            <h2 id="know-title">Good to know</h2>
            <ScrollFx effect="parallax" className={styles.knowPhoto}>
              <div data-parallax="25">
                <Photo name="golden-puppy" sizes="(min-width: 900px) 30vw, 60vw" />
              </div>
            </ScrollFx>
          </div>
          <ul className={styles.know}>
            {goodToKnow.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.link && (
                  <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {item.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="other-title">
        <div className="container">
          <div className="section-head">
            <h2 id="other-title">Other ways to join</h2>
          </div>
          <div className={styles.other}>
            <Link prefetch={false} href="/private-puppy-yoga-bali" className={styles.otherLink}>
              <Photo name="garden-pair" sizes="(min-width: 768px) 200px, 30vw" />
              <span>
                <strong>Private experiences</strong>
                Birthdays, retreats and milestones, for up to 19 guests.
              </span>
            </Link>
            <Link prefetch={false} href="/private-puppy-yoga-bali#gift-cards" className={styles.otherLink}>
              <Photo name="hero-poodle-hug" sizes="(min-width: 768px) 200px, 30vw" />
              <span>
                <strong>Gift cards</strong>
                Give someone an hour of puppy cuddles.
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
