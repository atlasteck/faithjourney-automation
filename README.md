# Faith Journey Automation

Funil Quiz → Score → Lead → App → Retenção

## Domínios
- quiz.faithjourney.atlasystem.online → Lovable quiz
- app.faithjourney.atlasystem.online → Lovable app
- api.faithjourney.atlasystem.online → Vercel

## Deploy
1. Push para GitHub
2. Importar no Vercel com env vars
3. Executar supabase-schema.sql no Supabase
4. Configurar webhook no Lovable para POST /api/webhook/quiz-complete

## Eventos
StartAssessment, CompleteQuiz, Lead, ViewContent, DailyCheckIn
