# Speech Intelligence System - Backend

The core processing engine of the Intelligence System. This backend handles heavy AI processing, running entirely offline models to extract transcriptions, summaries, topics, and action items from multimedia, and provides an API for the frontend.

## API Architecture
- **FastAPI**: Provides a high-performance REST API.
- **aiosqlite**: Asynchronous database interactions for managing job queues and results.
- **Uvicorn**: ASGI web server.

## AI Pipeline Technologies
The backend leverages multiple models sequentially (pipeline structure):
1. **faster-whisper**: High-performance audio transcription.
2. **BAAI/bge-small-en-v1.5 (sentence-transformers)**: Embeddings for semantic search and topic clustering.
3. **facebook/bart-large-cnn**: Abstractive text summarization.
4. **google/flan-t5-base**: Used for the Retrieval-Augmented Generation (RAG) Q&A system.
5. **spaCy (en_core_web_sm)**: NLP parser for extracting actionable verbs and tasks.

## Storage
- **Local DB (`db.sqlite3`)**: Stores job statuses (`pending`, `processing`, `completed`, `failed`) and final structured results.
- **Vector Store**: Uses **FAISS** to maintain localized vector embeddings of transcripts, required for the semantic RAG question-answering workflow.
- **Media Processing**: `ffmpeg-python` handles audio extraction from video files, and `yt-dlp` resolves and downloads YouTube media.

## Prerequisites
- **Python 3.10+**
- **FFmpeg**: You *must* have `ffmpeg` installed and accessible in your system's PATH.
  - Windows: Download from gyan.dev or use `winget install ffmpeg`.
  - Mac: `brew install ffmpeg`
  - Linux: `sudo apt install ffmpeg`

## Local Setup

1. **Create and Activate a Virtual Environment**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Download spaCy Model**
   ```bash
   python -m spacy download en_core_web_sm
   ```

4. **Run the Server**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

> **Hardware Warning:** On your first run, the system will download the AI models to your local cache. Running all models simultaneously requires a minimum of **4GB - 8GB of RAM**. If available, install PyTorch with CUDA support for significantly faster processing.
