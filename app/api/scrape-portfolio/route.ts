import { NextResponse } from 'next/server';
import { PortfolioScraper } from '@/lib/services/scraper';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const data = await PortfolioScraper.scrape(url);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Scrape Error:', error);
    return NextResponse.json({ error: 'Failed to scrape portfolio' }, { status: 500 });
  }
}
