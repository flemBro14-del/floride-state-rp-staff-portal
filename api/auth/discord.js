import crypto from "node:crypto";

export default function handler(req, res) {
  const state = crypto.randomBytes(24).toString("hex");

  res.setHeader(
    "Set-Cookie",
    oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=600
  );

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify"
  });

  res.redirect(
    https://discord.com/oauth2/authorize?${params.toString()}&state=${state}
  );
