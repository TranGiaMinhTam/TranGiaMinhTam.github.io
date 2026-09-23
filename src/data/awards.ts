import gysImage from '../assets/minh-tam/gallery/gys.jpg'
import wicoImage from '../assets/minh-tam/gallery/wico.jpg'
import debateImage from '../assets/minh-tam/gallery/debate.jpg'
import nuiChuaImage from '../assets/minh-tam/gallery/nui-chua-certificate.jpg'
import futureInnovatorImage from '../assets/minh-tam/projects/data-analytics.jpg'
import type { AwardEntry } from '../types/portfolio'

export const awards: AwardEntry[] = [
  {
    title: '1st Place',
    organization: 'Future Innovator Camp',
    year: 'July 2024',
    description: 'Received first place for Cool Ride, a customizable helmet concept with 12 integrated features, a business plan, and an investment pitch.',
    logo: futureInnovatorImage,
    tag: 'INNOVATION',
  },
  {
    title: 'Gold Medal',
    organization: 'Vinschool Science Innovation Challenge (VSIC), Vietnam',
    year: 'May 2026',
    description: 'Awarded Gold Medal for a molecular docking model targeting Type II diabetes therapeutic proteins and an interactive visualization platform.',
    logo: gysImage,
    tag: 'RESEARCH',
  },
  {
    title: 'Gold Award',
    organization: 'International Creative Papers Conference (ICPC), Korea',
    year: 'March 2026',
    description: 'Presented a scientific research project through poster, video, and brochure in an international research competition.',
    logoText: 'ICPC',
    tag: 'INTERNATIONAL',
  },
  {
    title: 'Top 20 Finalist',
    organization: 'Pre-University Adelaide Research Competition for Students',
    year: 'February 2026',
    description: 'Selected as a Top 20 Finalist among approximately 64 participants for an original research proposal and presentation.',
    logoText: 'TOP 20',
    tag: 'RESEARCH',
  },
  {
    title: 'Gold Award',
    organization: 'World Invention Creativity Olympic (WICO), Korea',
    year: 'July 2025',
    description: 'Presented a 34-page research paper and interactive project model before an international judging panel from around 80 countries.',
    logo: wicoImage,
    tag: 'INTERNATIONAL',
  },
  {
    title: 'Biology Star Award',
    organization: 'Vinschool Central Park',
    year: 'May 2026',
    description: 'Recognized for outstanding academic performance and excellence in Biology.',
    logoText: 'BIO',
    tag: 'ACADEMIC',
  },
  {
    title: 'Silver Medal',
    organization: 'Vinschool Book Week Debate Competition',
    year: 'November 2024',
    description: 'Earned a Silver Medal in an inter-school debate competition through critical thinking, argumentation, and public speaking.',
    logo: debateImage,
    tag: 'DEBATE',
  },
  {
    title: 'Sea Turtle Conservation Volunteer',
    organization: 'Nui Chua National Park, Vietnam',
    year: 'June 2024 & June 2025',
    description: 'Contributed to sea turtle conservation activities and community education during annual nesting-season volunteer trips.',
    logo: nuiChuaImage,
    tag: 'SERVICE',
  },
]
