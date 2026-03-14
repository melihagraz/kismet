// Kismet — Supabase Edge Functions + API Integration Setup
// D:\uygulamalar\kismet klasöründe çalıştır:
// node setup-api.js

const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('✅ ' + filePath);
}

// ============================================
// 1. Supabase Edge Function: kismet-reading
//    Bu dosyayı Supabase CLI ile deploy edeceğiz
// ============================================

writeFile('supabase/functions/kismet-reading/index.ts', `
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReadingRequest {
  type: "coffee" | "tarot" | "dream" | "palm" | "face";
  lang: "tr" | "en";
  userProfile?: {
    name?: string;
    zodiacSign?: string;
    gender?: string;
    relation?: string;
    focus?: string[];
  };
  // Type-specific data
  imageBase64?: string;    // coffee, palm, face (kamera görüntüsü)
  dreamText?: string;      // dream
  tarotCards?: string[];    // tarot (seçilen kart isimleri)
  tarotPositions?: string[]; // tarot (past, present, future)
}

function buildSystemPrompt(type: string, lang: string): string {
  const langInstruction = lang === "tr"
    ? "Yanıtını Türkçe ver. Sıcak, mistik ama samimi bir ton kullan. Kullanıcıya 'sen' diye hitap et."
    : "Respond in English. Use a warm, mystical but sincere tone. Address the user as 'you'.";

  const prompts: Record<string, string> = {
    coffee: \`Sen Kismet, deneyimli bir Türk kahve falcısısın. Fincan fotoğraflarından şekilleri yorumluyorsun.
\${langInstruction}

Kurallar:
- Fincandaki şekilleri tanımla (kuş, kalp, yol, ağaç, yıldız, göz, at, balık vb.)
- Her şeklin ne anlama geldiğini açıkla
- Geçmiş, şimdi ve gelecek hakkında yorum yap
- Pozitif ama gerçekçi ol
- 3-4 paragraf yaz
- Kullanıcının profil bilgilerini yorumuna entegre et\`,

    tarot: \`Sen Kismet, bilge bir tarot okuyucususun. Seçilen kartları yorumluyorsun.
\${langInstruction}

Kurallar:
- Her kartı pozisyonuyla birlikte yorumla (Geçmiş/Şimdi/Gelecek)
- Kartlar arası bağlantıları göster
- Genel bir özet ver
- Pozitif ve yapıcı ol
- Kullanıcının hayat odağına göre yorumla\`,

    dream: \`Sen Kismet, rüya yorumcususun. Rüyalardaki sembolleri ve anlamları çözümlüyorsun.
\${langInstruction}

Kurallar:
- Rüyadaki temel sembolleri tespit et
- Her sembolün psikolojik ve mistik anlamını açıkla
- Rüyanın genel mesajını özetle
- Bilinçaltı mesajlara dikkat çek
- Pratik öneriler sun
- 3-4 paragraf yaz\`,

    palm: \`Sen Kismet, el falı uzmanısın. Avuç içi fotoğraflarından çizgileri okuyorsun.
\${langInstruction}

Kurallar:
- Ana çizgileri analiz et: yaşam, kalp, akıl, kader, güneş çizgisi
- Her çizginin derinliği, uzunluğu ve şekline göre yorum yap
- Kişilik analizi yap
- Gelecek hakkında ipuçları ver
- 3-4 paragraf yaz\`,

    face: \`Sen Kismet, yüz okuma (fizyognomi) uzmanısın. Yüz hatlarından karakter analizi yapıyorsun.
\${langInstruction}

Kurallar:
- Yüz hatlarını analiz et: alın, gözler, burun, elmacık kemikleri, çene, dudaklar
- Her özelliğin karakter anlamını açıkla
- Enerji ve aura analizi yap
- Güçlü yönleri ve potansiyeli vurgula
- 3-4 paragraf yaz\`,
  };

  return prompts[type] || prompts.coffee;
}

function buildUserMessage(req: ReadingRequest): any[] {
  const content: any[] = [];
  const profile = req.userProfile;
  let profileContext = "";

  if (profile) {
    const parts = [];
    if (profile.name) parts.push(\`İsim: \${profile.name}\`);
    if (profile.zodiacSign) parts.push(\`Burç: \${profile.zodiacSign}\`);
    if (profile.gender) parts.push(\`Cinsiyet: \${profile.gender}\`);
    if (profile.relation) parts.push(\`İlişki: \${profile.relation}\`);
    if (profile.focus?.length) parts.push(\`Odak: \${profile.focus.join(", ")}\`);
    if (parts.length) profileContext = \`\\n\\nKullanıcı profili: \${parts.join(" | ")}\`;
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
        text: \`Bu kahve fincanını oku ve yorumla.\${profileContext}\`,
      });
      break;

    case "tarot":
      const cards = req.tarotCards?.join(", ") || "Büyücü, Kader Çarkı, Yıldız";
      const positions = req.tarotPositions?.join(", ") || "Geçmiş, Şimdi, Gelecek";
      content.push({
        type: "text",
        text: \`Seçilen tarot kartları: \${cards}\\nPozisyonlar: \${positions}\\n\\nBu kartları detaylı yorumla.\${profileContext}\`,
      });
      break;

    case "dream":
      content.push({
        type: "text",
        text: \`Şu rüyayı yorumla: "\${req.dreamText}"\${profileContext}\`,
      });
      break;

    case "palm":
      if (req.imageBase64) {
        content.push({
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: req.imageBase64 },
        });
      }
      content.push({
        type: "text",
        text: \`Bu avuç içi fotoğrafını analiz et ve el falı oku.\${profileContext}\`,
      });
      break;

    case "face":
      if (req.imageBase64) {
        content.push({
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: req.imageBase64 },
        });
      }
      content.push({
        type: "text",
        text: \`Bu yüz fotoğrafını analiz et ve karakter/enerji analizi yap.\${profileContext}\`,
      });
      break;
  }

  return content;
}

Deno.serve(async (req: Request) => {
  // CORS preflight
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

    // Görselli istekler için claude-sonnet (vision), text için haiku (ucuz)
    const needsVision = body.imageBase64 && ["coffee", "palm", "face"].includes(body.type);
    const model = needsVision ? "claude-sonnet-4-20250514" : "claude-haiku-4-5-20251001";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(\`Claude API error: \${response.status} - \${error}\`);
    }

    const data = await response.json();
    const reading = data.content?.[0]?.text || "Yorum oluşturulamadı.";

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
`);

// ============================================
// 2. App-side API service
// ============================================

writeFile('services/api.ts', `
const SUPABASE_URL = "https://vtnuirobrtswsjoxkkpl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bnVpcm9icnRzd3Nqb3hra3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MTkyOTAsImV4cCI6MjA4OTA5NTI5MH0.PVdzHnmCHcJlHRRQf-HuQFcty6DgAQMczuxT97cCN88";

const EDGE_FUNCTION_URL = SUPABASE_URL + "/functions/v1/kismet-reading";

export interface UserProfile {
  name?: string;
  zodiacSign?: string;
  gender?: string;
  relation?: string;
  focus?: string[];
}

export interface ReadingRequest {
  type: "coffee" | "tarot" | "dream" | "palm" | "face";
  lang: "tr" | "en";
  userProfile?: UserProfile;
  imageBase64?: string;
  dreamText?: string;
  tarotCards?: string[];
  tarotPositions?: string[];
}

export interface ReadingResponse {
  success: boolean;
  reading?: string;
  model?: string;
  error?: string;
}

export async function getAIReading(request: ReadingRequest): Promise<ReadingResponse> {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "apikey": SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("API error: " + response.status + " - " + errorText);
    }

    const data: ReadingResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("AI Reading error:", error);
    return {
      success: false,
      error: error.message || "Bağlantı hatası",
    };
  }
}

// Convenience functions
export async function getCoffeeReading(imageBase64: string, lang: "tr" | "en", profile?: UserProfile) {
  return getAIReading({ type: "coffee", lang, imageBase64, userProfile: profile });
}

export async function getTarotReading(cards: string[], positions: string[], lang: "tr" | "en", profile?: UserProfile) {
  return getAIReading({ type: "tarot", lang, tarotCards: cards, tarotPositions: positions, userProfile: profile });
}

export async function getDreamReading(dreamText: string, lang: "tr" | "en", profile?: UserProfile) {
  return getAIReading({ type: "dream", lang, dreamText, userProfile: profile });
}

export async function getPalmReading(imageBase64: string, lang: "tr" | "en", profile?: UserProfile) {
  return getAIReading({ type: "palm", lang, imageBase64, userProfile: profile });
}

export async function getFaceReading(imageBase64: string, lang: "tr" | "en", profile?: UserProfile) {
  return getAIReading({ type: "face", lang, imageBase64, userProfile: profile });
}
`);

// ============================================
// 3. Supabase CLI config
// ============================================

writeFile('supabase/config.toml', `
[api]
enabled = true
port = 54321
schemas = ["public"]

[db]
port = 54322

[studio]
enabled = true
port = 54323
`);

// ============================================
// 4. Deploy script (rehber)
// ============================================

writeFile('DEPLOY_EDGE_FUNCTIONS.md', `
# Kismet — Edge Functions Deploy Rehberi

## Ön Gereksinimler

1. Supabase CLI kur:
\`\`\`bash
npm install -g supabase
\`\`\`

2. Giriş yap:
\`\`\`bash
npx supabase login
\`\`\`
(Tarayıcıda Supabase hesabına giriş yapacak)

3. Projeye bağlan:
\`\`\`bash
npx supabase link --project-ref vtnuirobrtswsjoxkkpl
\`\`\`
(Database password soracak — projeyi oluştururken belirlediğin şifre)

## Edge Function Deploy

\`\`\`bash
npx supabase functions deploy kismet-reading --no-verify-jwt
\`\`\`

> --no-verify-jwt: Anon key ile erişim için JWT doğrulamayı kapat.
> Production'da JWT doğrulama açılmalı.

## Test Et

Deploy başarılı olduktan sonra test:

\`\`\`bash
curl -X POST "https://vtnuirobrtswsjoxkkpl.supabase.co/functions/v1/kismet-reading" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bnVpcm9icnRzd3Nqb3hra3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MTkyOTAsImV4cCI6MjA4OTA5NTI5MH0.PVdzHnmCHcJlHRRQf-HuQFcty6DgAQMczuxT97cCN88" \\
  -d '{"type":"dream","lang":"tr","dreamText":"Rüyamda denizde yüzüyordum, su çok berraktı"}'
\`\`\`

Başarılıysa şöyle bir JSON dönecek:
\`\`\`json
{
  "success": true,
  "reading": "Rüyanızdaki berrak deniz...",
  "model": "claude-haiku-4-5-20251001"
}
\`\`\`

## Maliyet Notu

- Text istekleri (tarot, dream): Claude Haiku → çok ucuz (~$0.001/istek)
- Vision istekleri (coffee, palm, face): Claude Sonnet → daha pahalı (~$0.01-0.03/istek)
- Ücretsiz Supabase tier: 500K Edge Function çağrısı/ay
\`\`\`
`);

console.log('\\n🔮 API entegrasyonu dosyaları oluşturuldu!');
console.log('\\n📦 Oluşturulan dosyalar:');
console.log('  - supabase/functions/kismet-reading/index.ts (Edge Function)');
console.log('  - services/api.ts (Uygulama tarafı API servisi)');
console.log('  - supabase/config.toml (Supabase CLI config)');
console.log('  - DEPLOY_EDGE_FUNCTIONS.md (Deploy rehberi)');
console.log('\\n📋 Sonraki adımlar:');
console.log('  1. Supabase Dashboard > Edge Functions > Manage Secrets > ANTHROPIC_API_KEY ekle');
console.log('  2. npm install -g supabase');
console.log('  3. npx supabase login');
console.log('  4. npx supabase link --project-ref vtnuirobrtswsjoxkkpl');
console.log('  5. npx supabase functions deploy kismet-reading --no-verify-jwt');
console.log('  6. Test et!\\n');
