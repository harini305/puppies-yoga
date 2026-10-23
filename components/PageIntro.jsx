import Photo from "./Photo";
import styles from "./PageIntro.module.css";

// Inner-page opening: title and lead beside a single photo (or text only).
export default function PageIntro({ title, lead, image, imagePosition, children }) {
  return (
    <section className={`${styles.intro} ${image ? styles.withImage : ""}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {image && (
          <Photo
            name={image}
            priority
            sizes="(min-width: 900px) 45vw, 100vw"
            className={styles.img}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        )}
      </div>
    </section>
  );
}
