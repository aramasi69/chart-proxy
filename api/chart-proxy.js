// /api/chart-proxy.js  (Vercel Serverless Function)
// Proxies requests to FreeAstrology API to avoid CORS/Forbidden.

export default async function handler(req, res) {
  // Basic CORS so you can test locally too (file:// or other origins)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", message: "Method not allowed" });
  }

  try {
    const apiUrl =
      "https://json.freeastrologyapi.com/horoscope-chart-svg-code";

    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        status: "error",
        message: data?.message || `Upstream error: ${upstream.statusText}`,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Proxy server error" });
  }
}
