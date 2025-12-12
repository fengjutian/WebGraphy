import axios from 'axios';
import * as cheerio from 'cheerio';

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

export class ScrapeService {
  async extractPageStructure(url: string): Promise<ScrapeResult> {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(data);

    const result: PageElement[] = [];

    $('h1, h2, h3, h4, h5, h6, p, ul, ol, img, a').each((_, el) => {
      const tag = el.tagName.toLowerCase();

      if (tag === 'img') {
        result.push({
          type: 'image',
          src: $(el).attr('src'),
          alt: $(el).attr('alt') || '',
        });
        return;
      }

      if (tag === 'a') {
        result.push({
          type: 'link',
          text: $(el).text().trim(),
          href: $(el).attr('href'),
        });
        return;
      }

      if (tag === 'ul' || tag === 'ol') {
        const items: string[] = [];
        $(el)
          .find('li')
          .each((_, li) => {
            items.push($(li).text().trim());
          });

        result.push({
          type: 'list',
          ordered: tag === 'ol',
          items,
        });
        return;
      }

      if (tag.startsWith('h')) {
        result.push({
          type: 'heading',
          level: Number(tag.replace('h', '')),
          text: $(el).text().trim(),
        });
        return;
      }

      if (tag === 'p') {
        result.push({
          type: 'paragraph',
          text: $(el).text().trim(),
        });
        return;
      }
    });

    return {
      url,
      structure: result,
    };
  }
}
