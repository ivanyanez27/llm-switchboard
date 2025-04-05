import { OpenAI } from "openai@4.28.0";
import { Anthropic } from "@anthropic-ai/sdk@0.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  prompt: string;
  providers: string[];
}

async function handleOpenAI(prompt: string, apiKey: string) {
  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error(`OpenAI Error: ${error.message}`);
  }
}

async function handleAnthropic(prompt: string, apiKey: string) {
  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });
    return response.content[0].text;
  } catch (error) {
    console.error('Anthropic Error:', error);
    throw new Error(`Anthropic Error: ${error.message}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, providers } = await req.json() as RequestBody;

    if (!prompt || !providers || !Array.isArray(providers)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const responses = await Promise.allSettled(
      providers.map(async (provider) => {
        let response = '';
        let error = null;

        try {
          switch (provider) {
            case 'openai':
              response = await handleOpenAI(prompt, Deno.env.get('OPENAI_API_KEY') || '');
              break;
            case 'anthropic':
              response = await handleAnthropic(prompt, Deno.env.get('ANTHROPIC_API_KEY') || '');
              break;
            default:
              error = `Provider ${provider} not implemented`;
          }
        } catch (e) {
          error = e.message;
        }

        return {
          provider,
          response,
          error,
        };
      })
    );

    return new Response(
      JSON.stringify({ responses }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});