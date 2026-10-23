import Link from "next/link";
import Hero from "@/components/home/Hero";
import Photo from "@/components/Photo";
import ButtonLink from "@/components/ButtonLink";
import Faq from "@/components/Faq";
import ScrollFx from "@/components/ScrollFx";
import { essentials, faqGroups, locations } from "@/lib/site";
import styles from "./page.module.css";

const moments = [
  { name: "puppy-on-face", shape: "tall" },
  { name: "golden-puppy", shape: "square" },
  { name: "jungle-cuddle", shape: "tall" },
  { name: "nap-together", shape: "square" },
  { name: "namaste", shape: "tall" },
  { name: "first-hello", shape: "square" },
  { name: "puppy-kisses", shape: "tall" },
  { name: "garden-pair", shape: "square" },
];

const topQuestions = [faqGroups[1].items[0], faqGroups[0].items[0], faqGroups[0].items[1], faqGroups[0].items[3]];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* What it is */}
      <section className={`section ${styles.intro}`} aria-labelledby="intro-title">
        <div className={`container ${styles.introGrid}`}>
          <ScrollFx effect="parallax" className={styles.introMedia}>
            <Photo name="pool-pack" sizes="(min-width: 900px) 45vw, 100vw" className={styles.introImg} />
            <div className={styles.introInset} data-parallax="30">
              <Photo name="puppy-bw" sizes="(min-width: 900px) 200px, 35vw" />
            </div>
          </ScrollFx>
          <div className={styles.introCopy}>
            <h2 id="intro-title">It&rsquo;s downward dog, but for a good cause.</h2>
            <p className="lead">
              A gentle yoga class for every level, in a calm space full of rescue puppies who are free to
              wander, nap and climb on you. You stretch. They heal. You zen out. They find a family.
            </p>
            <dl className={styles.facts}>
              {essentials.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
            <Link prefetch={false} href="/sessions" className="text-link">
              How a session works
            </Link>
          </div>
        </div>
      </section>

      {/* Rescue partner */}
      <section className={`section on-dark ${styles.rescue}`} aria-labelledby="rescue-title">
        <div className={`container ${styles.rescueGrid}`}>
          <div className={styles.rescueCopy}>
            <h2 id="rescue-title">Every puppy is a rescue, and every one is looking for a home.</h2>
            <p>
              All of our puppies come from Aseman Bali Dog Association, a family-run, cage-free shelter
              that cares for more than 350 rescued dogs. A few hours with us helps them learn to trust
              people and get used to new places, which makes them far more likely to be adopted.
            </p>
            <p>
              Puppy Yoga Bali never owns, breeds or sells the dogs. Your ticket helps fund food,
              vaccinations and care at the shelter, and if you fall in love, every puppy can be adopted.
            </p>
            <ButtonLink href="/faq#the-puppies" variant="outline">
              Where the puppies come from
            </ButtonLink>
          </div>
          <ScrollFx effect="parallax" className={styles.rescueMedia}>
            <Photo name="aseman-shelter" sizes="(min-width: 900px) 50vw, 100vw" className={styles.rescueMain} />
            <div className={styles.rescueSmall} data-parallax="45">
              <Photo name="savasana" sizes="(min-width: 900px) 260px, 45vw" />
            </div>
          </ScrollFx>
        </div>
      </section>

      {/* Locations */}
      <section className="section" aria-labelledby="locations-title">
        <div className="container">
          <div className="section-head">
            <h2 id="locations-title">Poolside or in the jungle?</h2>
            <p className="lead muted">Two places to practise, both with the same rescue puppies.</p>
          </div>
          <ScrollFx effect="reveal" className={styles.locGrid}>
            {locations.map((loc) => (
              <article key={loc.id} className={styles.loc} data-fx-item>
                <Link prefetch={false} href={`/locations#${loc.id}`} className={styles.locLink}>
                  <Photo name={loc.image} sizes="(min-width: 768px) 50vw, 100vw" className={styles.locImg} />
                  <span className={styles.locLabel}>
                    <span className={styles.locName}>{loc.name}</span>
                    <span>
                      {loc.setting} at {loc.venue}
                    </span>
                  </span>
                </Link>
                <p className={styles.locBlurb}>{loc.blurb}</p>
                <a href={loc.bookUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  See {loc.name} dates<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* Moments */}
      <section className={`section ${styles.moments}`} aria-labelledby="moments-title">
        <div className="container">
          <div className="section-head">
            <h2 id="moments-title">Real sessions, no filters.</h2>
            <p className="lead muted">Moments from the mat in Canggu and Ubud.</p>
          </div>
        </div>
        <ScrollFx effect="drift" className={styles.momentsViewport} tabIndex={0} aria-label="Photos from sessions">
          <ul className={styles.momentsTrack} data-fx-track>
            {moments.map((m) => (
              <li key={m.name} className={styles[m.shape]}>
                <Photo name={m.name} sizes="(min-width: 768px) 320px, 70vw" />
              </li>
            ))}
          </ul>
        </ScrollFx>
      </section>

      {/* FAQ preview: with the footer it fills the last screen */}
      <section className={`section ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <div className={styles.faqIntro}>
            <h2 id="faq-title">Before you roll out your mat</h2>
            <p className="muted">The questions we hear most. Everything else is on the FAQ page.</p>
            <ButtonLink href="/faq" variant="outline">
              All questions
            </ButtonLink>
          </div>
          <Faq items={topQuestions} defaultOpen={-1} />
        </div>
      </section>
    </>
  );
}
