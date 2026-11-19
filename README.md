# Faith Journey Automation

Funil Quiz → Score → Lead → App → Retenção

## Domínios
- quiz.faithjourney.atlasystems.online → Lovable quiz
- app.faithjourney.atlasystems.online → Lovable app
- api.faithjourney.atlasystems.online → Vercel

## Deploy
1. Push para GitHub
2. Importar no Vercel com env vars
3. Executar supabase-schema.sql no Supabase
4. Configurar webhook no Lovable para POST /api/webhook/quiz-complete

## Eventos
StartAssessment, CompleteQuiz, Lead, ViewContent, DailyCheckIn
