# Kismet — Edge Functions Deploy Rehberi

## Ön Gereksinimler

1. Supabase CLI kur:
```bash
npm install -g supabase
```

2. Giriş yap:
```bash
npx supabase login
```
(Tarayıcıda Supabase hesabına giriş yapacak)

3. Projeye bağlan:
```bash
npx supabase link --project-ref vtnuirobrtswsjoxkkpl
```
(Database password soracak — projeyi oluştururken belirlediğin şifre)

## Edge Function Deploy

```bash
npx supabase functions deploy kismet-reading --no-verify-jwt
```

> --no-verify-jwt: Anon key ile erişim için JWT doğrulamayı kapat.
> Production'da JWT doğrulama açılmalı.

## Test Et

Deploy başarılı olduktan sonra test:

```bash
curl -X POST "https://vtnuirobrtswsjoxkkpl.supabase.co/functions/v1/kismet-reading" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bnVpcm9icnRzd3Nqb3hra3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MTkyOTAsImV4cCI6MjA4OTA5NTI5MH0.PVdzHnmCHcJlHRRQf-HuQFcty6DgAQMczuxT97cCN88" \
  -d '{"type":"dream","lang":"tr","dreamText":"Rüyamda denizde yüzüyordum, su çok berraktı"}'
```

Başarılıysa şöyle bir JSON dönecek:
```json
{
  "success": true,
  "reading": "Rüyanızdaki berrak deniz...",
  "model": "claude-haiku-4-5-20251001"
}
```

## Maliyet Notu

- Text istekleri (tarot, dream): Claude Haiku → çok ucuz (~$0.001/istek)
- Vision istekleri (coffee, palm, face): Claude Sonnet → daha pahalı (~$0.01-0.03/istek)
- Ücretsiz Supabase tier: 500K Edge Function çağrısı/ay
```
