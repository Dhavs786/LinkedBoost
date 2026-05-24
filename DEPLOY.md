# LinkedBoost – AI LinkedIn Profile Enhancer

## Deployment Guide

### Frontend → Vercel (Free)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Set **Root Directory** to `frontend`
4. Set **Environment Variable**:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`
5. Deploy!

### Backend → Render (Free)
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Build Command** to: `pip install -r requirements.txt`
5. Set **Start Command** to: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Set **Environment Variables**:
   - `GEMINI_API_KEY` = your Gemini API key
7. Deploy!

### Important Notes
- The backend CORS is set to allow all origins (`*`) for dev. For production, update `main.py` to only allow your Vercel domain.
- The `.env` file is only for local development. On Render, set env vars through their dashboard.
