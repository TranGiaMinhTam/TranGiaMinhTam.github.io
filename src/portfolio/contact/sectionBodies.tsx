import type { SectionBodyRegistry } from "../shell/SectionBodyResolver";
import { ContactSignal } from "./ContactSignal";

export const contactBodyRegistry: SectionBodyRegistry = Object.freeze({
  contact: () => <ContactSignal />,
});
