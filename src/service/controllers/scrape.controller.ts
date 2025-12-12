import { ScrapeService } from '../scrape/scrape.service';
import { ScrapeResult } from '../models/scrape.model';

/**
 * Controller for handling web scraping requests
 * Provides an interface between the API layer and the service layer
 */
export class ScrapeController {
  private scrapeService: ScrapeService;

  constructor() {
    this.scrapeService = new ScrapeService();
  }

  /**
   * Extracts page structure from a given URL
   * @param url The URL of the page to scrape
   * @returns Promise<ScrapeResult> The structured data from the page
   */
  async extractPageStructure(url: string): Promise<ScrapeResult> {
    // Input validation
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      throw new Error('Invalid URL format');
    }

    // Call service layer
    const result = await this.scrapeService.extractPageStructure(url);

    // Return formatted result
    return result;
  }
}
