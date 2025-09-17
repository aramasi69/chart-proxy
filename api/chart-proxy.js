export default async function handler(req, res) {
  // Basic CORS so you can test from anywhere
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 👇 ADD this: simple GET response so you can test in a browser
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "Proxy is deployed. POST here to forward to the chart API." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  // (keep the rest of the POST proxy code exactly as you already have it)
