import { ScrapeService, ScrapeResult } from './scrape/scrape.service';

const scrapeService = new ScrapeService();

export const api = {
  scrape: {
    extractPageStructure: (url: string): Promise<ScrapeResult> => scrapeService.extractPageStructure(url),
  },
};
