export async function sendMetaEvent(eventName: string, eventTime: number, userData: any, customData?: any) {
  const token = process.env.META_ACCESS_TOKEN!;
  const pixelId = process.env.META_PIXEL_ID!;
  const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: eventName,
        event_time: eventTime,
        action_source: 'website',
        user_data: userData,
        custom_data: customData
      }]
    })
  });
}

export function hashEmail(email: string) {
  return Buffer.from(email.toLowerCase().trim()).toString('base64');
}
