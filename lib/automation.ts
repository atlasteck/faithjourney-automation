import { createKlaviyoProfile, triggerKlaviyoFlow } from '../../lib/klaviyo';
import { sendMetaEvent } from '../../lib/meta-capi';

export async function handleLeadAutomation(email: string, scores: any, utm: any) {
  await createKlaviyoProfile(email, {
    faith_score: scores.faithScore,
    peace_score: scores.peaceScore,
    total_score: scores.total,
    bucket: scores.bucket,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign
  });

  await triggerKlaviyoFlow(email);

  const userData = {
    em: [email.toLowerCase()],
    client_ip_address: '',
    client_user_agent: ''
  };

  await sendMetaEvent('CompleteQuiz', Math.floor(Date.now()/1000), userData, {
    content_name: 'Faith & Peace Score',
    total_score: scores.total
  });

  await sendMetaEvent('Lead', Math.floor(Date.now()/1000), userData, {
    content_name: 'Faith Journey Lead'
  });
}
