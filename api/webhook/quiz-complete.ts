import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase';
import { calculateScores } from '../../lib/score';
import { handleLeadAutomation } from '../../lib/automation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, answers, utm_source, utm_medium, utm_campaign, utm_content, fbp, fbc } = req.body || {};

  if (!email || !answers) return res.status(400).json({ error: 'email and answers required' });

  const { faithScore, peaceScore, total, bucket } = calculateScores(answers);

  const { data: lead, error } = await supabase
    .from('leads')
    .upsert({
      email,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      quiz_completed_at: new Date().toISOString()
    }, { onConflict: 'email' })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from('quiz_responses').insert({
    lead_id: lead.id,
    answers,
    faith_score: faithScore,
    peace_score: peaceScore,
    total_score: total,
    result_bucket: bucket
  });

  await handleLeadAutomation(email, { faithScore, peaceScore, total, bucket }, { utm_source, utm_medium, utm_campaign, utm_content });

  return res.status(200).json({ leadId: lead.id, scores: { faithScore, peaceScore, total, bucket } });
}
