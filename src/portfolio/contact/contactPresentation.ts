import { CONTACT_PRIVACY, PORTFOLIO_CONTACT_PRIVACY } from './contactModel'

export type ContactPresentation = Readonly<{
  eyebrow: string
  heading: string
  introduction: string
  composerLabel: string
  privacy: string
  action: string
  recipientNote: string
  handoffNote: string
  layout: 'legacy' | 'portfolio'
}>

export const legacyContactPresentation: ContactPresentation = Object.freeze({
  eyebrow: 'Correspondence channel / 10',
  heading: 'Start with a clear research question.',
  introduction: 'For research mentorship, collaboration, or academic opportunities, prepare an email draft locally—without submitting this form to a server.',
  composerLabel: 'Local draft composer',
  privacy: CONTACT_PRIVACY,
  action: 'Prepare email draft',
  recipientNote: 'Prefer your own workflow? Use the direct email link at any time.',
  handoffNote: 'This opens your email application. Review and send the message there.',
  layout: 'legacy',
})

export const portfolioContactPresentation: ContactPresentation = Object.freeze({
  eyebrow: 'Portfolio contact / 10',
  heading: 'Let us connect.',
  introduction: 'Have a project, collaboration, opportunity, or question in mind? Write a message here, then continue in your email app.',
  composerLabel: 'Email draft',
  privacy: PORTFOLIO_CONTACT_PRIVACY,
  action: 'Open email draft',
  recipientNote: 'Prefer email directly? Use this address anytime.',
  handoffNote: 'Review, edit, and send the message from your email app.',
  layout: 'portfolio',
})
