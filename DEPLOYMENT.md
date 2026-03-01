# Deployment Guide: Vercel & Render

This guide explains how to deploy the frontend to Vercel and the backend to Render.

## 1. Backend Deployment (Render)

**Important Note before you begin:**
This backend uses large AI models. The free tier on Render (512MB RAM) will likely crash with an Out-Of-Memory (OOM) error. You need a paid instance (4GB+ RAM) to run this backend. Furthermore, SQLite data will be lost on restart unless you use a persistent disk.

### Steps:
1. Create a [Render](https://render.com/) account and connect your GitHub repository.
2. Click **New +** and select **Web Service**.
3. Select this repository from your connected GitHub account.
4. **Configuration Form:**
   - **Name**: e.g., `speech-intelligence-api`
   - **Language**: `Python`
   - **Branch**: `main`
   - **Root Directory**: `backend` (Important: type `backend` here)
   - **Build Command**: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Select a plan with at least 4GB of RAM.
5. Click **Create Web Service**. 
6. Wait for the deployment to finish and copy the generated Render URL (e.g., `https://speech-intelligence-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

### Steps:
1. Create a [Vercel](https://vercel.com/) account and connect your GitHub repository.
2. Click **Add New** -> **Project**.
3. Import this repository.
4. **Configuration Form:**
   - **Project Name**: e.g., `speech-intelligence-ui`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Select `frontend` (Click Edit and choose `frontend`).
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: `[Your Render Backend URL]/api/v1` (Paste the URL you copied from Render, ensuring it ends in `/api/v1`. Example: `https://speech-intelligence-api.onrender.com/api/v1`).
5. Click **Deploy**.
6. Once completed, Vercel will give you a live URL for your frontend.

### Troubleshooting
- **CORS Errors**: The backend is already configured to allow all origins (`allow_origins=["*"]`), so CORS will not be an issue.
- **Vercel Build Error (`Vite requires Node.js version 20.18+`)**: Vercel uses Node 20.x or 22.x by default, so it shouldn't produce the local Node.js error. If it does, make sure Node.js `20.x` or `22.x` is selected in your Vercel project settings under **Settings -> General -> Node.js Version**.
