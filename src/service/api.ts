import { ScrapeController } from './controllers/scrape.controller';
import { ScrapeResult } from './models/scrape.model';

const scrapeController = new ScrapeController();

export const api = {
  scrape: {
    extractPageStructure: (url: string): Promise<ScrapeResult> => scrapeController.extractPageStructure(url),
  },
};
