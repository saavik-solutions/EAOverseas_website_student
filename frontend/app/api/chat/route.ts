import { OpenAI } from 'openai';



export async function POST(req: Request) {
  const { messages, context, profile } = await req.json();

  const systemPrompt = `You are the EduAI Senior Mentor at EAOverseas. You are a world-class strategist for global student mobility.

  CRITICAL DIRECTIVE: 
  - DO NOT give generic welcomes or introductions if the user has asked a specific question. 
  - ADDRESS the user's query IMMEDIATELY and DIRECTLY.
  - If they ask for universities or courses, you MUST use the STRUCTURED JSON format.
  - Be precise, data-driven, and reference the student's context (GPA, Budget) to justify your advice.

  PERSONALITY:
  - Sophisticated, authoritative, and analytical.
  - No fluff. No repetitive pleasantries.

  RESPONSE FORMATS:
  1. RAW TEXT: For general advice and conversation.
  2. STRUCTURED JSON: For lists. Format: { "type": "universities"|"courses"|"steps", "data": Array }

  CONTEXT:
  - View: ${context.page}
  - Profile: ${JSON.stringify(profile)}

  EXAMPLE (If asked about MBA under $30k):
  { "type": "courses", "data": [{ "name": "MBA Global", "domain": "Business", "fee": "$28,000", "slug": "mba-global" }] }`;

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        
        const lastContent = messages[messages.length - 1]?.content?.toLowerCase() || '';
        let mockResponse: { type: string, data: any } = { 
          type: 'text', 
          data: "I am operating in Offline Simulator mode because no OpenAI API Key was found in your environment variables. However, your frontend UI is working perfectly! Ask me for 'universities' or 'courses' to see interactive components." 
        };

        if (lastContent.includes('university') || lastContent.includes('universities') || lastContent.includes('college')) {
          mockResponse = {
            type: 'universities',
            data: [
              { name: "University of Oxford", location: "United Kingdom", fee: "£26,000/yr", slug: "oxford" },
              { name: "Stanford University", location: "United States", fee: "$55,000/yr", slug: "stanford" },
              { name: "University of Melbourne", location: "Australia", fee: "A$35,000/yr", slug: "melbourne" }
            ]
          };
        } else if (lastContent.includes('course') || lastContent.includes('degree') || lastContent.includes('mba') || lastContent.includes('program')) {
          mockResponse = {
            type: 'courses',
            data: [
              { name: "MSc Computer Science", domain: "Engineering", fee: "$20,000/yr", slug: "msc-computer-science" },
              { name: "MBA Global Business", domain: "Business", fee: "$35,000/yr", slug: "mba-global-business" }
            ]
          };
        } else if (lastContent.includes('hi') || lastContent.includes('hello')) {
            mockResponse = { type: 'text', data: "Hello there! I am your resilient local AI simulator. Even without an OpenAI key, I can show you how the UI renders data. Try asking me to 'show me universities' or 'recommend some courses'!" };
        }

        controller.enqueue(encoder.encode(JSON.stringify(mockResponse)));
        controller.close();
      }
    });
    return new Response(stream);
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Map 'ai' role to 'assistant' (OpenAI doesn't accept 'ai' as a role)
    // Also ensure content is always a string
    const formattedMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'ai' || m.role === 'assistant')
      .map((m: any) => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
      }));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...formattedMessages
      ]
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(encoder.encode(text));
          }
        } catch (streamError) {
          console.error("Stream generation error:", streamError);
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'text', data: "An error occurred while generating the response." })));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream);
  } catch (error: any) {
    console.error("Chat API error:", error);
    const errStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(JSON.stringify({ type: 'text', data: error?.message || "Internal server error connecting to AI." })));
        controller.close();
      }
    });
    return new Response(errStream, { status: 500 });
  }
}
