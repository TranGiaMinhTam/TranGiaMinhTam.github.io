import { useEffect, useState } from "react";
import { resolvePortfolioRoute } from "./journalModel";
import type { JournalRouteLocation } from "./journal.types";

const readRoute = (): JournalRouteLocation =>
  resolvePortfolioRoute(
    typeof window === "undefined" ? "" : window.location.hash,
  );

export function usePortfolioRoute(): JournalRouteLocation {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return route;
}
