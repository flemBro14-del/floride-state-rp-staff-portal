export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({
      error: "Missing Discord authorization code."
    });
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId  !clientSecret  !redirectUri) {
    return res.status(500).json({
      error: "Discord environment variables are missing."
    });
  }

  try {
    const tokenResponse = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri
        })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(400).json({
        error: "Discord authorization failed."
      });
    }

    const userResponse = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: Bearer ${tokenData.access_token}
        }
      }
    );

    const user = await userResponse.json();

    if (!userResponse.ok) {
      return res.status(400).json({
        error: "Could not retrieve Discord user."
      });
    }

    return res.status(200).json({
      message: "Discord callback successful!",
      username: user.username,
      userId: user.id
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during Discord login."
    });
  }
}
