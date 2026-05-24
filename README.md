# LinkedBoost 🚀 — AI LinkedIn Profile Enhancer

LinkedBoost is a modern, premium web application designed to help job seekers stand out to top recruiters. Instead of relying on fragile web scrapers that get blocked by LinkedIn's security measures, LinkedBoost leverages a secure, user-driven **PDF Upload workflow** to extract profile details and generate professional AI enhancements and Q&A insights.

Powered by **FastAPI**, **React (Vite) + Tailwind CSS**, and the **Google Gemini API**.

---

## ✨ Features

- **📄 Local PDF Parsing:** Drop your LinkedIn profile PDF (generated directly from LinkedIn). Zero network calls to LinkedIn, 100% bypass of CAPTCHAs, and complete privacy.
- **💎 Premium SaaS UI/UX:** A gorgeous modern interface with glassmorphism panels, interactive drag-and-drop file previews, and a sleek mesh gradient background.
- **✨ AI Enhancements:** Instant, high-quality recommendations for your Headline, Summary, Experience, and Skills sections crafted by Gemini.
- **💬 AI Career Coach:** An interactive Q&A assistant built right into the dashboard to help you write cover letters, prepare for interviews, or tailor your resume.
- **⚡ 100% Private & Stateless:** Your PDF data and resume text are processed in-memory and never written to disk or database.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons, Axios, React Markdown
- **Backend:** FastAPI, PyPDF2, Google GenAI SDK, Python-dotenv
- **AI Model:** Google Gemini 1.5/2.0

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A Google Gemini API Key (Get one free at [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend` folder:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev -- --port 5173
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🌍 Deployment

For step-by-step instructions on how to deploy the frontend to Vercel and the backend to Render, check out the [Deployment Guide](DEPLOY.md).

---

## 📝 How to Save your LinkedIn Profile as a PDF

1. Go to your LinkedIn Profile page.
2. Click the **More** button in your profile header (next to "Add profile section").
3. Select **Save to PDF** from the dropdown menu.
4. Drag and drop the downloaded PDF directly into LinkedBoost!
