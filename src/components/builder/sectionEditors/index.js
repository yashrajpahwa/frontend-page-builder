import HeroEditor from "./HeroEditor";
import CardGridEditor from "./CardGridEditor";
import TextWithImageEditor from "./TextWithImageEditor";
import TestimonialsEditor from "./TestimonialsEditor";
import CallToActionEditor from "./CallToActionEditor";
import SpeakersEditor from "./SpeakersEditor";
import PartnersEditor from "./PartnersEditor";
import GalleryEditor from "./GalleryEditor";
import TimelineEditor from "./TimelineEditor";
import FreestyleEditor from "./FreestyleEditor";

const sectionEditors = {
  hero: HeroEditor,
  cardGrid: CardGridEditor,
  textWithImage: TextWithImageEditor,
  testimonials: TestimonialsEditor,
  callToAction: CallToActionEditor,
  speakers: SpeakersEditor,
  partners: PartnersEditor,
  mediaPartners: PartnersEditor,
  gallery: GalleryEditor,
  timeline: TimelineEditor,
  freestyle: FreestyleEditor,
};

export default sectionEditors;
