# Speech Intelligence System - Frontend

This is the React + TypeScript frontend for the offline Audio/Video Intelligence System. It provides a modern, responsive user interface to upload media, track processing progress, and interact with the analyzed content.

## Key Features
- **Media Ingestion**: Upload local video/audio files or provide YouTube URLs for processing.
- **Real-time Status Polling**: Tracks the progression of the AI pipeline (downloading, transcribing, summarizing, extracting).
- **Result Dashboard**: Clean presentation of generated summaries, topics, and actionable items.
- **RAG QA Interface**: A chat-like interface to ask specific questions about the processed media content.
- **Responsive Design**: Fully styled with Tailwind CSS for cross-device compatibility.

## Tech Stack
- **React 19**
- **Vite** (Build Tool)
- **TypeScript**
- **Tailwind CSS**
- **Axios** (API Communication)
- **Lucide React** (Icons)

## Prerequisites
- **Node.js**: Version 20.19+ or 22.12+ 

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   If you are running the backend locally, the development server defaults to `http://localhost:8000/api/v1`.
   For production or connecting to an external backend, create a `.env` file in the root of the `frontend` directory:
   ```env
   VITE_API_URL=https://your-backend-url.com/api/v1
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## API Integration (`src/api/apiClient.ts`)
The `apiClient` manages communication with the FastAPI backend. It exports functions for:
- `processMedia(file, url)`: Initiates the pipeline.
- `getJobStatus(jobId)`: Polls the backend for progress updates.
- `getResult(jobId)`: Fetches final processed data (summary, actions, topics).
- `askQuestion(jobId, question, history)`: Prompts the RAG pipeline for answers.
