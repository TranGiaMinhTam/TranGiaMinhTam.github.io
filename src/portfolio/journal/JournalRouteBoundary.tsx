import { Component, type ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  resetKey: number;
  canRetry: boolean;
  onRetry: () => void;
}>;

type State = Readonly<{ failed: boolean }>;

export class JournalRouteBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    // The failure stays local. U-07 intentionally has no remote logging surface.
  }

  componentDidUpdate(previous: Props) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section
        role="alert"
        aria-labelledby="journal-load-failure-heading"
        style={{
          maxWidth: "48rem",
          margin: "10vh auto",
          padding: "2rem",
          border: "2px solid var(--color-data-caution)",
          background: "var(--color-surface)",
        }}
      >
        <p
          style={{
            color: "var(--color-accent)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
          }}
        >
          Route status / unavailable
        </p>
        <h1 id="journal-load-failure-heading" tabIndex={-1}>
          The research note could not be loaded.
        </h1>
        <p>
          The portfolio remains available. Return to Data Stories or try loading
          this route once more.
        </p>
        {this.props.canRetry ? (
          <button type="button" onClick={this.props.onRetry}>
            Try once more
          </button>
        ) : (
          <p>Retry unavailable. Please return to Data Stories.</p>
        )}
      </section>
    );
  }
}
