import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase';
import { handleLeadAutomation } from '../../lib/automation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, first_name, utm_source, utm_medium, utm_campaign, utm_content } = req.body || {};

  if (!email) return res.status(400).json({ error: 'email required' });

  const { data: lead, error } = await supabase
    .from('leads')
    .upsert({
      email,
      first_name,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      lead_created_at: new Date().toISOString()
    }, { onConflict: 'email' })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await handleLeadAutomation(email, { faithScore: 0, peaceScore: 0, total: 0, bucket: 'Unknown' }, { utm_source, utm_medium, utm_campaign, utm_content });

  return res.status(200).json({ leadId: lead.id, email });
}
