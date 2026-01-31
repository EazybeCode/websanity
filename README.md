<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1K4kiDo1Ke6RfvI9UO0oK17R9BhP63eI3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Coolify

The app is containerized with Docker. Use these settings in Coolify:

1. **Create New Resource** → choose your Git option (Public Repository, GitHub App, or Deploy Key) and paste your repo URL.

2. **Build pack:** Switch from Nixpacks to **Dockerfile**.

3. **Configure build:**
   - **Branch:** Your default branch (e.g. `main`).
   - **Base directory:** `/` (root).

4. **Network (important):**
   - Set **Port** to **80**. The image runs nginx on port 80; Coolify’s default is 3000, so this must be 80.

5. **Domain:** Add your domain in the network section and enable the proxy if you use Coolify’s reverse proxy.

6. **Environment variables (optional):** If the app needs build-time env vars (e.g. `GEMINI_API_KEY` for Vite), add them in the **Environment Variables** tab. They are baked in at build time, so change = redeploy.

7. **Deploy:** Click **Deploy** (or enable **Auto Deploy** / webhook so pushes trigger a new build).

If you see “No Available Server” after deploy, confirm the port is **80** and check the container logs in Coolify.
