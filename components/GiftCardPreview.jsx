"use client";

import { useId, useState } from "react";
import LogoMark from "./LogoMark";
import ButtonLink from "./ButtonLink";
import { LIVE_SITE } from "@/lib/site";
import styles from "./GiftCardPreview.module.css";

// Front-end preview only: nothing typed here is stored or sent.
export default function GiftCardPreview() {
  const id = useId();
  const [forSomeone, setForSomeone] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const greeting = forSomeone ? (name.trim() ? `For ${name.trim()}` : "For someone special") : "For me, from me";

  return (
    <div className={styles.wrap}>
      <div className={styles.card} aria-live="polite">
        <div className={styles.cardTop}>
          <LogoMark className={styles.mark} />
          <span>Puppy Yoga Bali</span>
        </div>
        <p className={styles.greeting}>{greeting}</p>
        <p className={styles.message}>{message.trim() || "An hour of yoga, surrounded by rescue puppies."}</p>
        <p className={styles.cardFoot}>Gift card</p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="Gift card preview">
        <fieldset className={styles.choice}>
          <legend className="visually-hidden">Who is it for?</legend>
          <label>
            <input type="radio" name={`${id}-who`} checked={forSomeone} onChange={() => setForSomeone(true)} />
            <span>For someone else</span>
          </label>
          <label>
            <input type="radio" name={`${id}-who`} checked={!forSomeone} onChange={() => setForSomeone(false)} />
            <span>For myself</span>
          </label>
        </fieldset>

        {forSomeone && (
          <label className={styles.field}>
            <span>Recipient name</span>
            <input value={name} maxLength={28} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          </label>
        )}
        <label className={styles.field}>
          <span>Message</span>
          <textarea value={message} maxLength={110} rows={3} onChange={(e) => setMessage(e.target.value)} />
        </label>

        <ButtonLink href={`${LIVE_SITE}/gift-card`} variant="solid">
          Choose an amount &amp; buy
        </ButtonLink>
        <p className={styles.hint}>
          This preview isn&rsquo;t saved. Amounts, delivery date and payment are handled on puppiesyogabali.com.
        </p>
      </form>
    </div>
  );
}
