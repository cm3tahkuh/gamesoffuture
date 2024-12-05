import { NextResponse } from 'next/server';
import { scrapeChannel } from '@/app/utils/telegramScraper';

export async function GET() {
  try {
    const messages = await scrapeChannel('gofnews');
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' }, 
      { status: 500 }
    );
  }
}
