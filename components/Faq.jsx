"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.css";

function FaqItem({ item, open, onToggle }) {
  const id = useId();
  const isExternal = item.link?.href.startsWith("http");
  return (
    <div className={styles.item} data-open={open}>
      <h3 className={styles.question}>
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={onToggle}>
          <span>{item.q}</span>
          <span className={styles.icon} aria-hidden="true" />
        </button>
      </h3>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className={styles.panel} inert={!open}>
        <div className={styles.panelInner}>
          <p>{item.a}</p>
          {item.link && (
            <a
              href={item.link.href}
              className="text-link"
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.link.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Faq({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
