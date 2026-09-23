import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import type { JournalRouteLocation } from "./journal.types";
import { JournalRouteBoundary } from "./JournalRouteBoundary";
import { usePortfolioRoute } from "./usePortfolioRoute";

export type JournalEntryProps = Readonly<{
  location: Exclude<JournalRouteLocation, { kind: "continuous" }>;
}>;
const JournalEntryAttemptZero = lazy(() => import("./JournalRouteEntry"));
const JournalEntryAttemptOne = lazy(() => import("./JournalRouteEntry"));

function LoadingState() {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <section
      role="status"
      aria-labelledby="journal-loading-heading"
      style={{
        maxWidth: "48rem",
        margin: "10vh auto",
        padding: "2rem",
        background: "var(--color-surface)",
        borderBlockStart: "0.4rem solid var(--color-accent)",
      }}
    >
      <p
        style={{
          color: "var(--color-accent)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
        }}
      >
        Research note / loading
      </p>
      <h1 id="journal-loading-heading" ref={heading} tabIndex={-1}>
        Preparing the project note…
      </h1>
    </section>
  );
}

export function JournalRoute({
  children,
  entryComponent,
}: Readonly<{
  children: ReactNode;
  entryComponent?: ComponentType<JournalEntryProps>;
}>) {
  const location = usePortfolioRoute();
  const [attempt, setAttempt] = useState(0);

  if (location.kind === "continuous") return children;

  const Entry =
    entryComponent ??
    (attempt === 0 ? JournalEntryAttemptZero : JournalEntryAttemptOne);

  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        padding: "clamp(1rem, 4vw, 4rem)",
        color: "var(--color-text-primary)",
        background: "var(--color-canvas)",
      }}
      data-testid="journal-route"
    >
      <a
        href="#data-stories"
        style={{
          display: "inline-flex",
          minHeight: "2.75rem",
          alignItems: "center",
          color: "var(--color-accent)",
          fontWeight: 750,
          textDecoration: "underline",
          textUnderlineOffset: "0.25em",
        }}
      >
        ← Return to Data Stories
      </a>
      <JournalRouteBoundary
        resetKey={attempt}
        canRetry={attempt < 1}
        onRetry={() => setAttempt(1)}
      >
        <Suspense fallback={<LoadingState />}>
          <Entry location={location} />
        </Suspense>
      </JournalRouteBoundary>
    </main>
  );
}
