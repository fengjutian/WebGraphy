// Model definitions for web scraping functionality

export type PageElement = 
  | { type: 'image'; src: string | undefined; alt: string }
  | { type: 'link'; text: string; href: string | undefined }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string };

export interface ScrapeResult {
  url: string;
  structure: PageElement[];
}
