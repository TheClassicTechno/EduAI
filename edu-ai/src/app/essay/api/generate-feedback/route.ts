// app/essay-feedback/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, essay } = await request.json();

    if (!essay || essay.trim().length === 0) {
      return NextResponse.json({ error: 'Essay text is required' }, { status: 400 });
    }

    // Use Anthropic's Claude API
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key is not configured' }, 
        { status: 500 }
      );
    }

    // Create the prompt for Claude
    const systemPrompt = `You are a supportive academic writing assistant who provides detailed feedback on essays. 
      Your feedback should be constructive, specific, and actionable.
      Always write what sentences or words are wrong or need improvement and the reason.
      Don't write an example of how student could revise an essay for them.
      Include sections for GRAMMAR, STRUCTURE, CONTENT, LANGUAGE, OVERALL assessment.`;
      
    const userPrompt = `Please provide feedback on my essay titled "${title}": \n\n${essay}`;

    // Call Anthropic's Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        // model: 'claude-2', // Or 'claude-instant-1' for faster, less expensive responses
        // Try with 'claude-3-haiku-20240307' which is available to most users
        // or 'claude-3-sonnet-20240229' if available
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate feedback from Anthropic');
    }

    const data = await response.json();
    const feedback = data.content[0].text;

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error generating feedback:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}