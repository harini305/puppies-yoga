import PageIntro from "@/components/PageIntro";
import Photo from "@/components/Photo";
import ButtonLink from "@/components/ButtonLink";
import ScrollFx from "@/components/ScrollFx";
import { locations } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Locations in Canggu & Ubud",
  description:
    "Puppy yoga by the pool at Anginsepoi Hotel in Canggu, or in the open-air jungle shala at K Club Ubud. Addresses, arrival tips and booking links.",
};

export default function LocationsPage() {
  return (
    <>
      <PageIntro
        title="Two places, same puppies."
        lead="Practise beside a hotel pool in Canggu or in an open-air shala above the Ubud jungle. Both sessions bring the same rescue puppies from Aseman Bali Dog Association."
      >
        <nav aria-label="Jump to a location" className="btn-row">
          {locations.map((loc) => (
            <a key={loc.id} href={`#${loc.id}`} className="btn btn--outline">
              {loc.name}
            </a>
          ))}
        </nav>
      </PageIntro>

      {locations.map((loc, i) => (
        <section
          key={loc.id}
          className={`section ${i === 0 ? styles.first : ""} ${i % 2 ? styles.alt : ""}`}
          aria-labelledby={loc.id}
        >
          <div className={`container ${styles.grid}`}>
            <ScrollFx effect="reveal" className={styles.mosaic}>
              <div className={styles.main} data-fx-item>
                <Photo name={loc.image} sizes="(min-width: 900px) 55vw, 100vw" />
              </div>
              {loc.gallery.map((name) => (
                <div key={name} className={styles.small} data-fx-item>
                  <Photo name={name} sizes="(min-width: 900px) 27vw, 50vw" />
                </div>
              ))}
            </ScrollFx>

            <div className={styles.info}>
              <h2 id={loc.id}>{loc.name}</h2>
              <p className="lead">{loc.blurb}</p>
              <dl className={styles.details}>
                <div>
                  <dt>Venue</dt>
                  <dd>{loc.venue}</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{loc.address}</dd>
                </div>
                <div>
                  <dt>When you arrive</dt>
                  <dd>
                    {loc.arrival} {loc.times && loc.extra}
                  </dd>
                </div>
                {loc.times ? (
                  <div>
                    <dt>Usual start times</dt>
                    <dd>{loc.times.join(", ")}</dd>
                  </div>
                ) : (
                  <div>
                    <dt>Dates</dt>
                    <dd>{loc.extra}</dd>
                  </div>
                )}
              </dl>
              <div className="btn-row">
                <ButtonLink href={loc.bookUrl}>See {loc.name} dates &amp; book</ButtonLink>
                <ButtonLink href={loc.mapUrl} variant="outline">
                  Open in Google Maps
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
