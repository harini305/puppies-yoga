import ButtonLink from "@/components/ButtonLink";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gap: "var(--space-m)", justifyItems: "start" }}>
        <h1>This puppy wandered off.</h1>
        <p className="lead">The page you're looking for doesn't exist. Try the homepage or our sessions.</p>
        <div className="btn-row">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/sessions" variant="outline">
            See sessions
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
