import type { SectionBodyRegistry } from "../shell/SectionBodyResolver";
import { ContactSignal } from "./ContactSignal";
import { portfolioContactPresentation } from './contactPresentation'

export const portfolioContactCandidateRegistry: SectionBodyRegistry = Object.freeze({
  contact: () => <ContactSignal presentation={portfolioContactPresentation} />,
});
