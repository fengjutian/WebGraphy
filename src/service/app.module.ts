import { Module } from '@nestjs/common';
import { ScrapeModule } from './scrape/scrape.module';

@Module({
  imports: [ScrapeModule],
})
export class AppModule {}
