import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReadingRequest {
  type: "coffee" | "tarot" | "dream" | "birthchart";
  lang: "tr" | "en";
  userProfile?: {
    name?: string;
    zodiacSign?: string;
    gender?: string;
    relation?: string;
    focus?: string[];
  };
  imageBase64?: string;
  dreamText?: string;
  tarotCards?: string[];
  tarotPositions?: string[];
  birthChartData?: string;
}

const SAFETY_RULES_TR = `
Önemli kurallar:
- Yalnızca öz-düşünce ve eğlence amaçlıdır. Bu bir fal veya kehanet değildir.
- Deterministik ifadelerden kaçın ("olacak", "kesinlikle", "görüyorum ki kaderin" gibi).
- Onun yerine düşündürücü dil kullan: "düşünebilirsin", "şunu çağrıştırabilir", "yansıtabilir".
- Sonuçları öneri olarak sun, kesin tahmin olarak değil.
- Sağlık/finans/ilişki konusunda profesyonel tavsiye verme.
- Her yanıtın sonuna kısa bir "Try this" (Şunu dene) önerisi ekle.
`;

const SAFETY_RULES_EN = `
Important rules:
- For self-reflection and entertainment only. This is NOT fortune telling or prophecy.
- Avoid deterministic phrases ("will happen", "definitely", "your fate is" etc.).
- Use reflective language instead: "you might consider", "may suggest", "could invite reflection on".
- Frame outputs as prompts for reflection, not predictions.
- Never give professional medical, financial or relationship advice.
- End every response with a short "Try this" actionable suggestion.
`;

function buildSystemPrompt(type: string, lang: string): string {
  const safety = lang === "tr" ? SAFETY_RULES_TR : SAFETY_RULES_EN;
  const langInstruction = lang === "tr"
    ? "Yanıtını Türkçe ver. Sıcak, düşündürücü ve samimi bir ton kullan. Kullanıcıya 'sen' diye hitap et."
    : "Respond in English. Use a warm, reflective and sincere tone. Address the user as 'you'.";

  const prompts: Record<string, string> = {
    coffee: `You are Cosmic Help's Image Reflection assistant. The user has shared an image for personal reflection (not fortune telling).
${langInstruction}
${safety}

Approach:
- Describe shapes, colors and patterns you notice in the image (objectively).
- For each notable pattern, offer a reflection prompt: "this might invite you to consider...".
- Connect observations to possible themes the user could reflect on (not predictions).
- 3 short paragraphs maximum.
- End with a concrete "Try this" step the user can take today.`,

    tarot: `You are Cosmic Help's Prompt Cards assistant. The user has drawn archetypal cards to help them reflect on a question.
${langInstruction}
${safety}

Approach:
- For each card, describe its archetypal theme (not a prediction).
- Turn each card into a reflection question ("What in your life right now resembles this archetype?").
- Help the user connect the cards to their own thinking — do not tell them what will happen.
- End with a concrete "Try this" journaling prompt or small action.`,

    dream: `You are Cosmic Help's Dream Journal assistant. The user has described a dream and wants to reflect on its themes.
${langInstruction}
${safety}

Approach:
- Identify recurring symbols, emotions and scene elements.
- For each, offer possible meanings from common psychology / symbolism.
- Frame everything as "may suggest", "could relate to", "one interpretation is...".
- Never claim the dream predicts anything.
- End with a "Try this" reflection prompt.`,

    birthchart: `You are Cosmic Help's Cosmic Insights assistant. The user has provided astronomical data (planetary positions, houses, aspects from their birth data). You offer symbolic reflections — not predictions.
${langInstruction}
${safety}

Approach:
- Describe the symbolic themes commonly associated with each major placement (Sun, Moon, Ascendant).
- Frame insights as self-reflection prompts, not fate.
- Use phrases like "one traditional interpretation is...", "this placement is often associated with...", "you may recognize this pattern in...".
- Tailor reflection themes to the user's stated focus area.
- Avoid fixed predictions about future events, relationships, health or finances.
- 4-5 short paragraphs.
- End with 1-2 concrete "Try this" reflection or journaling prompts.`,
  };

  return prompts[type] || prompts.coffee;
}

function buildUserMessage(req: ReadingRequest): any[] {
  const content: any[] = [];
  const profile = req.userProfile;
  let profileContext = "";

  if (profile) {
    const parts = [];
    if (profile.name) parts.push(`Name: ${profile.name}`);
    if (profile.zodiacSign) parts.push(`Sign: ${profile.zodiacSign}`);
    if (profile.focus?.length) parts.push(`Focus: ${profile.focus.join(", ")}`);
    if (parts.length) profileContext = `\n\nUser profile: ${parts.join(" | ")}`;
  }

  switch (req.type) {
    case "coffee":
      if (req.imageBase64) {
        content.push({
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: req.imageBase64 },
        });
      }
      content.push({
        type: "text",
        text: `The user shared this image for reflection. Offer reflection prompts based on what you observe.${profileContext}`,
      });
      break;

    case "tarot":
      const cards = req.tarotCards?.join(", ") || "The Magician, Wheel of Fortune, The Star";
      const positions = req.tarotPositions?.join(", ") || "Past, Present, Future";
      content.push({
        type: "text",
        text: `Drawn cards: ${cards}\nPositions: ${positions}\n\nTurn these into reflection prompts for the user.${profileContext}`,
      });
      break;

    case "dream":
      content.push({
        type: "text",
        text: `The user described this dream: "${req.dreamText}". Offer possible symbolic themes to reflect on.${profileContext}`,
      });
      break;

    case "birthchart":
      content.push({
        type: "text",
        text: `Astronomical data from the user's birth:\n\n${req.birthChartData || "No data"}\n\nOffer symbolic reflection themes based on traditional astrological archetypes.${profileContext}`,
      });
      break;
  }

  return content;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    const body: ReadingRequest = await req.json();

    if (!body.type || !body.lang) {
      throw new Error("Missing required fields: type, lang");
    }

    const systemPrompt = buildSystemPrompt(body.type, body.lang);
    const userMessage = buildUserMessage(body);

    const needsVision = body.imageBase64 && body.type === "coffee";
    const model = needsVision ? "claude-sonnet-4-20250514" : "claude-haiku-4-5-20251001";
    const maxTokens = body.type === "birthchart" ? 2048 : 1024;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const reading = data.content?.[0]?.text || "No reflection generated.";

    return new Response(
      JSON.stringify({ success: true, reading, model }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
