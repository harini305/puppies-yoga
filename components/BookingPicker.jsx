"use client";

import { useRef, useState } from "react";
import Photo from "./Photo";
import ButtonLink from "./ButtonLink";
import { locations } from "@/lib/site";
import styles from "./BookingPicker.module.css";

export default function BookingPicker() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const loc = locations[active];

  const onKeyDown = (e) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + locations.length) % locations.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.picker}>
      <div role="tablist" aria-label="Choose a location" className={styles.tabs} onKeyDown={onKeyDown}>
        {locations.map((l, i) => (
          <button
            key={l.id}
            ref={(node) => (tabs.current[i] = node)}
            type="button"
            role="tab"
            id={`tab-${l.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${l.id}`}
            tabIndex={active === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabName}>{l.name}</span>
            <span className={styles.tabSetting}>{l.setting}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${loc.id}`}
        aria-labelledby={`tab-${loc.id}`}
        className={styles.panel}
        key={loc.id}
      >
        <Photo name={loc.image} sizes="(min-width: 900px) 40vw, 100vw" className={styles.img} />
        <div className={styles.details}>
          <h3>
            {loc.venue}, {loc.name}
          </h3>
          <dl>
            <div>
              <dt>Address</dt>
              <dd>{loc.address}</dd>
            </div>
            <div>
              <dt>Arrival</dt>
              <dd>{loc.arrival}</dd>
            </div>
            <div>
              <dt>{loc.times ? "Usual start times" : "Dates"}</dt>
              <dd>
                {loc.times ? (
                  <ul className={styles.times}>
                    {loc.times.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  loc.extra
                )}
              </dd>
            </div>
          </dl>
          <div className="btn-row">
            <ButtonLink href={loc.bookUrl}>See {loc.name} dates &amp; book</ButtonLink>
            <ButtonLink href={loc.mapUrl} variant="outline">
              Open map
            </ButtonLink>
          </div>
          <p className={styles.note}>
            Dates, live prices and checkout open on the current puppiesyogabali.com booking page.
          </p>
        </div>
      </div>
    </div>
  );
}
