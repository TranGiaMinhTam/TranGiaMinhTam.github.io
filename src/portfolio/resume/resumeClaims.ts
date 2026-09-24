import { contentId, evidenceId } from '../model/portfolio.types'
import { resumeClaimId, type PublicResumeClaim, type ResumeCategory } from './resume.types'

const claim = (
  id: string,
  category: ResumeCategory,
  title: string,
  summary: string,
  sourcePage: 1 | 2,
  order: number,
  options: Readonly<{ period?: string; evidenceIds?: readonly string[]; existingRecordId?: string }> = {},
): PublicResumeClaim => Object.freeze({
  id: resumeClaimId(id),
  category,
  title,
  summary,
  sourcePage,
  order,
  evidenceIds: Object.freeze((options.evidenceIds ?? []).map(evidenceId)),
  ...(options.period ? { period: options.period } : {}),
  ...(options.existingRecordId ? { existingRecordId: contentId(options.existingRecordId) } : {}),
  publication: 'public',
  reviewState: 'reviewed',
})

export const reviewedResumeClaims = Object.freeze([
  claim('resume-education-vinschool', 'education', 'Vinschool Central Park — A-level programme', 'Biology, Chemistry and Mathematics; GPA 9.0/10 in Grade 10, AAA in Grade 11, AAA predicted for Grade 12 Semester 1; IGCSE Mathematics A*, Coordinated Science A*, Computer Science A; IELTS 7.0 in September 2025.', 1, 1, { period: 'August 2024 – present', existingRecordId: 'academic-1' }),
  claim('resume-scholarships', 'scholarship', 'A-level tuition scholarships', 'Received a 90% A-level tuition scholarship from Worthgate School and an 80% A-level tuition scholarship from Bosworth Independent School.', 1, 2, { evidenceIds: ['evidence-worthgate-scholarship', 'evidence-borsworth-scholarship'] }),
  claim('resume-star-awards', 'academic-recognition', 'Vinschool Star Awards', 'Outstanding award for Biology in Grade 11 and Physical Education in Grade 10.', 1, 3),
  claim('resume-vsic-gold', 'research-honor', 'Gold Medal — Vinschool Science Innovation Challenge', 'Presented the prototype and research poster for hands-on judging; the team was one of three first-prize teams among approximately 40 teams.', 1, 4, { period: 'May 2026' }),
  claim('resume-icpc-gold', 'research-honor', 'Gold Award — International Creative Papers Conference', 'Presented a scientific research project in an international online competition through a research poster, recorded video presentation and project brochure.', 1, 5, { period: 'March 2026' }),
  claim('resume-adelaide-finalist', 'research-honor', 'Top 20 Finalist — Pre-University Adelaide Research Competition', 'Authored a seven-page original research proposal and presented it online; the resume records selection as a Top 20 Finalist, approximately top 31%, and 13th overall out of 70 selected participants.', 1, 6, { period: 'February 2026' }),
  claim('resume-wico-gold', 'research-honor', 'Gold Award — World Invention Creativity Olympic', 'Presented a 34-page scientific research paper and interactive project model to an international judging panel representing participants from approximately 80 countries.', 1, 7, { period: 'July 2025', evidenceIds: ['evidence-wico-poster'] }),
  claim('resume-iwise-silver', 'research-honor', 'Silver Award — International World Innovative Student Exhibition', 'Presented a scientific research project at an international innovation exhibition in Dubai using a poster, recorded presentation and supporting materials.', 1, 8, { period: 'January 2026' }),
  claim('resume-gys-finalist', 'research-honor', 'Finalist, Winning Group — Global Youth Summit Senior Division', 'Collaborated on a cashew testa valorization project and advanced to the Senior Division Finals as one of six finalist teams among 14 competitors.', 1, 9, { period: 'June 2025', evidenceIds: ['evidence-gys-brochure'] }),
  claim('resume-kyoto-delegate', 'leadership', 'Delegate and Full-Scholarship Recipient — Kyoto SDGs Youth Summit', 'Selected as one of nine full-scholarship recipients from 60 applicants (top 15%) to represent Vietnam and collaborate on Sustainable Development Goal projects.', 1, 10, { period: 'March 2026 – present', existingRecordId: 'experience-2' }),
  claim('resume-world-scholars-cup', 'academic-competition', 'World Scholar’s Cup — Regional and Global Rounds', 'Competed in debate, collaborative writing and Scholar’s Bowl in Da Nang and Bangkok; earned five trophies and 14 medals, including six Gold and eight Silver medals.', 1, 11, { period: 'May – June 2024' }),
  claim('resume-fino-first', 'innovation-project', '1st Place — Future Innovator Camp', 'Developed a customizable helmet with 12 integrated features using Adobe and AI tools, product specifications, a business plan and an investment pitch; received first prize and VND 5 million in programme funding.', 2, 12, { period: 'July 2024', evidenceIds: ['evidence-future-innovator-first-place'] }),
  claim('resume-sim-lse-finalist', 'data-project', 'Top 10 Finalist — SIM-LSE Data Analytics Challenge', 'Used Tableau to develop an interactive retail dashboard and translate insights into business recommendations through a pitch deck; selected among the Top 10 of 29 teams.', 2, 13, { period: 'July 2026', evidenceIds: ['evidence-sim-lse-certificate'], existingRecordId: 'project-sim-lse-data-analytics' }),
  claim('resume-molecular-docking', 'computational-research', 'Molecular Docking Model for Type II Diabetes Targets', 'Built a computational molecular-docking workflow across SUR1, DPP4, GLR-1R, PPAR-γ and SGLT2 using AutoDock Vina, plus an interactive platform for protein–ligand visualisation.', 2, 14, { period: 'August 2025 – June 2026', evidenceIds: ['evidence-protein-docking-publication', 'evidence-docking-conference-poster'], existingRecordId: 'project-molecular-docking-model' }),
  claim('resume-cashew-polyphenol', 'laboratory-research', 'Cashew Testa Bioactive Polyphenol Research', 'Conducted a nine-month ultrasound-assisted extraction study with DPPH, ABTS, disk diffusion and MIC testing; developed a prototype antioxidant skincare cream and published the findings.', 2, 15, { period: 'January – September 2025', evidenceIds: ['evidence-wico-poster', 'evidence-cashew-polyphenol-figure'], existingRecordId: 'project-cashew-testa-research' }),
  claim('resume-tiv-deputy-head', 'leadership', 'Deputy Head, Science Research and Content — The Institute of Viéce', 'Led scientific review and publication for a 32-member academic team within a leadership group of one Head and three Deputy Heads.', 2, 16, { period: 'March – September 2026', existingRecordId: 'experience-1' }),
  claim('resume-mathematics-mentor', 'mentoring', 'Free IGCSE Mathematics Online Mentor', 'Designed and delivered free weekly lessons for six students over five months, with structured lesson plans adapted to learner needs.', 2, 17, { period: 'February – June 2025', existingRecordId: 'experience-3' }),
  claim('resume-sea-turtle-conservation', 'fieldwork', 'Sea Turtle Conservation — Nui Chua National Park', 'Joined two annual volunteer trips during nesting season, supported conservation activities and contributed basic IT classes for children.', 2, 18, { period: 'June 2024 – June 2025', existingRecordId: 'experience-4' }),
  claim('resume-nam-cat-tien', 'fieldwork', 'Wildlife Conservation — Nam Cat Tien National Park', 'Completed a one-week field programme supporting wildlife conservation, environmental protection and biodiversity awareness.', 2, 19, { period: 'June 2024 – June 2025' }),
  claim('resume-green-agriculture', 'fieldwork', 'Green Agriculture Volunteer Programme — Quang Nam', 'Joined a one-week sustainable agriculture programme with hands-on farming and English teaching alongside international volunteers.', 2, 20, { period: 'July 2024' }),
  claim('resume-reforestation', 'fieldwork', 'Reforestation Programme — Binh Chau–Phuoc Buu', 'Participated in a three-day programme contributing to tree planting and forest restoration.', 2, 21, { period: 'July 2024' }),
] as const satisfies readonly PublicResumeClaim[])

export const reviewedResumeCategories = Object.freeze(
  [...new Set(reviewedResumeClaims.map(({ category }) => category))].sort(),
)
