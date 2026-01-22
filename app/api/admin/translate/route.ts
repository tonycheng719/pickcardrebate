import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface TranslateRequest {
  text: string | string[];
  targetLocale: 'zh-CN' | 'en';
  context?: string; // e.g., "credit card name", "promotion description"
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, targetLocale, context = 'financial product' } = body;

    if (!text) {
      return NextResponse.json({ error: 'Missing text to translate' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const isArray = Array.isArray(text);
    const textsToTranslate = isArray ? text : [text];

    const targetLanguage = targetLocale === 'zh-CN' ? '简体中文' : 'English';
    const sourceLanguage = '繁體中文';

    const systemPrompt = `You are a professional translator specializing in ${context} translations.
Translate from ${sourceLanguage} to ${targetLanguage}.
Keep the same formatting and structure.
For financial terms, use standard industry terminology.
${targetLocale === 'zh-CN' ? 'Convert traditional Chinese characters to simplified Chinese.' : ''}
Only return the translated text, nothing else.
If there are multiple items separated by newlines, translate each one and return them separated by newlines.`;

    const userPrompt = textsToTranslate.join('\n---SEPARATOR---\n');

    // Use fetch to call OpenAI API directly
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    const translatedContent = data.choices?.[0]?.message?.content || '';
    
    if (isArray) {
      const translatedArray = translatedContent.split('\n---SEPARATOR---\n').map((s: string) => s.trim());
      return NextResponse.json({ 
        translated: translatedArray,
        usage: data.usage,
      });
    } else {
      return NextResponse.json({ 
        translated: translatedContent.trim(),
        usage: data.usage,
      });
    }
  } catch (error: any) {
    console.error('[Translate API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
}

