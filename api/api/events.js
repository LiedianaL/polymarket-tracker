export default async function handler(req, res) {
  const { closed } = req.query;
  let url;
  if (closed === 'true') {
    url = 'https://gamma-api.polymarket.com/events?closed=true&limit=50&order=volume&ascending=false';
  } else {
    url = 'https://gamma-api.polymarket.com/events?limit=50&order=volume24hr&ascending=false&closed=false&active=true';
  }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'PolyTracker/2.0' } });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
