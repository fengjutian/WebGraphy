import { Controller, Get, Query } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Get()
  async fetchPage(@Query('url') url: string) {
    return this.scrapeService.extractPageStructure(url);
  }
}
