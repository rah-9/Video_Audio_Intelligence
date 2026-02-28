# Offline Video & Meeting Intelligence System - Backend

## Built With
- FastAPI
- SQLite (aiosqlite)
- faster-whisper
- sentence-transformers
- FAISS
- transformers (facebook/bart-large-cnn)
- spaCy

## Setup locally
You must have `ffmpeg` installed on your system path.

1. `python -m venv venv`
2. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. `pip install -r requirements.txt`
4. `python -m spacy download en_core_web_sm`

## Run
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
