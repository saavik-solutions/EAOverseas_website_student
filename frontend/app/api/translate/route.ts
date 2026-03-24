import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, targetLanguage = 'en', sourceLanguage = 'auto' } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text payload is required for translation' }, { status: 400 });
    }

    // Leverage the free, open-source 'gtx' Google Translation protocol
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Upstream API rejected translation request: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Construct the continuous string from the matrix array: [[[ "Translated", "Original", null, null, 1 ]]]
    const translatedText = data[0].map((item: any[]) => item[0]).join('');
    
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Core Translation Engine Anomaly:', error);
    return NextResponse.json({ error: 'Failed to process translation block' }, { status: 500 });
  }
}
