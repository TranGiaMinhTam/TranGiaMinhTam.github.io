import { businessTemplate } from "./business";
import type { PortfolioTemplate } from "./types";

export const portfolioTemplates = [businessTemplate] satisfies PortfolioTemplate[];

export const getPortfolioTemplate = (): PortfolioTemplate => businessTemplate;

export const activePortfolioTemplate = getPortfolioTemplate();
