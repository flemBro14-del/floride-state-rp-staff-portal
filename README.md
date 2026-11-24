# Florida State RP Staff Portal — Preview

This is a front-end preview of the purple-and-black staff portal.

## Important security note
This is **not yet a live, secure staff system**. The preview button is not Discord authentication. Do not use it to store real staff data or expose private information.

To launch a real staff-only site, add:
- Discord OAuth2 sign-in
- Server-side authorization / owner approval
- A database for approved staff and audit logs
- Server-side protected routes and secure environment variables

Never commit Discord client secrets, bot tokens, or database credentials to GitHub.

## Deploy the preview to Vercel
1. Create a new GitHub repository named `florida-state-rp-staff-portal`.
2. Upload `index.html` and this `README.md` to the repository root.
3. In Vercel, choose **Add New → Project** and import that GitHub repository.
4. Keep the default settings and click **Deploy**.
5. The resulting URL is a public preview only; it does not enforce staff-only access yet.
