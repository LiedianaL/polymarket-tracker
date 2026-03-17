export default async function handler(req, res) {
  const { offset = '0', market = '' } = req.query;
  let url = `https://data-api.polymarket.com/trades?limit=500&offset=${offset}`;
  if (market) url += `&market=${market}`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'PolyTracker/2.0' } });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
