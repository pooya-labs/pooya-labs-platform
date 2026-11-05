export interface LocalizedText { fa: string; en: string }
export interface CaseStudyReference { label: LocalizedText; url: string }
export interface CaseStudyDossier {
  role: LocalizedText;
  architecture: LocalizedText;
  implementation: { fa: string[]; en: string[] };
  decisions: { fa: string[]; en: string[] };
  verification: { fa: string[]; en: string[] };
  references: CaseStudyReference[];
}
