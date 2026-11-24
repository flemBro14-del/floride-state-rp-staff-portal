export default function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).send("Discord login settings are missing.");
  }

  const discordUrl = new URL(
    "https://discord.com/oauth2/authorize"
  );

  discordUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify"
  }).toString();

  return res.redirect(discordUrl.toString());
}
