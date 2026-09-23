import kyotoSummit from '../assets/minh-tam/gallery/kyoto-summit.jpg'
import wico from '../assets/minh-tam/gallery/wico.jpg'
import gys from '../assets/minh-tam/gallery/gys.jpg'
import nuiChuaCertificate from '../assets/minh-tam/gallery/nui-chua-certificate.jpg'
import debate from '../assets/minh-tam/gallery/debate.jpg'
import namCatTien from '../assets/minh-tam/gallery/nam-cat-tien.jpg'
import type { GalleryItem } from '../types/portfolio'

export const gallery = [
  {
    id: 'kyoto-sdgs-youth-summit',
    src: kyotoSummit,
    alt: 'Tran Gia Minh Tam and fellow delegates at the Kyoto SDGs Youth Summit',
    title: 'Kyoto SDGs Youth Summit',
    description: 'Representing Vietnam as a full-scholarship delegate and collaborating with international students on sustainability challenges.',
  },
  {
    id: 'wico-world-invention-creativity-olympic',
    src: wico,
    alt: 'World Invention Creativity Olympic award presentation with Tran Gia Minh Tam',
    title: 'World Invention Creativity Olympic',
    description: 'Presenting the cashew testa research project at an international innovation competition in Korea.',
  },
  {
    id: 'global-youth-summit',
    src: gys,
    alt: 'Global Youth Summit finalist presentation with student team members',
    title: 'Global Youth Summit',
    description: 'Working with teammates on a cashew testa valorization project and reaching the Senior Division Finals.',
  },
  {
    id: 'nui-chua-sea-turtle-conservation',
    src: nuiChuaCertificate,
    alt: 'Nui Chua National Park sea turtle conservation certificate',
    title: 'Sea Turtle Conservation',
    description: 'Supporting sea turtle conservation and community education during volunteer work at Nui Chua National Park.',
  },
  {
    id: 'book-week-debate',
    src: debate,
    alt: 'Vinschool Book Week Debate Competition certificate',
    title: 'Competitive Debate',
    description: 'Building argumentation, critical-thinking, and public-speaking skills through inter-school debate.',
  },
  {
    id: 'nam-cat-tien-wildlife-conservation',
    src: namCatTien,
    alt: 'Wildlife conservation volunteering at Nam Cat Tien National Park',
    title: 'Wildlife Conservation',
    description: 'Taking part in field volunteering for biodiversity protection and environmental awareness at Nam Cat Tien National Park.',
  },
] satisfies GalleryItem[]
