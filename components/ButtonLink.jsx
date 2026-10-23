import Link from "next/link";

// Pill CTA. External links open the current live booking site in a new tab.
export default function ButtonLink({ href, children, variant = "solid", className = "", external, ...rest }) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const cls = `btn btn--${variant} ${className}`.trim();
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
        {newTab && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link prefetch={false} href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
