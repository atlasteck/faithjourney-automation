export async function createKlaviyoProfile(email: string, properties: Record<string, any>) {
  const apiKey = process.env.KLAYVIO_API_KEY!;
  const url = 'https://a.klaviyo.com/api/v2/list/members';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': Klaviyo-API-Key 
    },
    body: JSON.stringify({
      api_key: apiKey,
      profiles: [{ email, properties }]
    })
  });
  return response.ok;
}

export async function triggerKlaviyoFlow(email: string) {
  const apiKey = process.env.KLAYVIO_API_KEY!;
  const flowId = process.env.KLAYVIO_FLOW_ID!;
  await fetch('https://a.klaviyo.com/api/v2/flow/webhook', {
    method: 'POST',
    headers: { 'Authorization': Klaviyo-API-Key  },
    body: JSON.stringify({ email, flow_id: flowId })
  });
}
