import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, FileVideo, AlertCircle, FileAudio, Youtube, Sparkles } from 'lucide-react';

interface UploadFormProps {
    onSubmit: (file?: File, url?: string) => void;
    isLoading: boolean;
}

export function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
    const [mode, setMode] = useState<'url' | 'file'>('url');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave" || e.type === "drop") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        setError('');
        const validTypes = ['video/mp4', 'audio/mpeg', 'audio/wav', 'video/webm'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a supported format (MP4, MP3, WAV, WEBM)');
            return;
        }
        if (file.size > 2 * 1024 * 1024 * 1024) {
            setError('File size must be less than 2GB');
            return;
        }
        setFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (mode === 'url') {
            if (!url) {
                setError('Please enter a YouTube URL');
                return;
            }
            if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
                setError('Please enter a valid YouTube URL');
                return;
            }
            onSubmit(undefined, url);
        } else {
            if (!file) {
                setError('Please select a file');
                return;
            }
            onSubmit(file, undefined);
        }
    };

    return (
        <div className="glass-panel p-2 rounded-3xl w-full max-w-2xl mx-auto shadow-2xl relative group">

            {/* Vibrant border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-1000 -z-10"></div>

            <div className="bg-surface/90 rounded-[1.35rem] p-6 sm:p-8 backdrop-blur-xl border border-zinc-800/80">
                <div className="flex p-1 mb-8 bg-zinc-900/80 rounded-2xl relative border border-zinc-800">
                    <button
                        className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 z-10 ${mode === 'url' ? 'text-white bg-surfaceHighlight shadow-lg border border-zinc-700/50' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        onClick={() => { setMode('url'); setError(''); }}
                    >
                        <Youtube className="w-4 h-4" /> YouTube URL
                    </button>
                    <button
                        className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 z-10 ${mode === 'file' ? 'text-white bg-surfaceHighlight shadow-lg border border-zinc-700/50' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        onClick={() => { setMode('file'); setUrl(''); setError(''); }}
                    >
                        <UploadCloud className="w-4 h-4" /> Upload File
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="min-h-[160px] flex flex-col justify-center">
                        {mode === 'url' ? (
                            <div className="animate-fade-in relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LinkIcon className="h-5 w-5 text-purple-400 group-hover/input:text-purple-300 transition-colors" />
                                </div>
                                <input
                                    type="url"
                                    className="block w-full pl-12 pr-4 py-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:ring-0 focus:border-purple-500 transition-all duration-300 outline-none text-base sm:text-lg"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div
                                className={`relative animate-fade-in flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl transition-all duration-300 bg-zinc-900/30 ${dragActive ? 'border-pink-500 bg-pink-500/5 scale-[1.02]' : 'border-zinc-700 hover:border-pink-500/50 hover:bg-zinc-800/50'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="video/mp4,audio/mpeg,audio/wav,video/webm"
                                    onChange={handleChange}
                                />
                                {file ? (
                                    <div className="flex flex-col items-center gap-3 animate-slide-up">
                                        <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                            {file.type.includes('audio') ? (
                                                <FileAudio className="w-8 h-8 text-pink-400" />
                                            ) : (
                                                <FileVideo className="w-8 h-8 text-pink-400" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-zinc-200 truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-xs text-zinc-500 font-medium mt-1">
                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-zinc-500 group-hover:text-pink-400 transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-zinc-800/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-zinc-700">
                                            <UploadCloud className="w-6 h-6 text-zinc-400 group-hover:text-pink-400" />
                                        </div>
                                        <p className="font-bold text-sm text-zinc-300">Click to upload or drag and drop</p>
                                        <p className="text-xs mt-2 text-zinc-500">MP4, MP3, WAV up to 2GB</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm font-bold bg-red-400/10 p-4 rounded-xl border border-red-500/20 animate-fade-in">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || (!url && !file)}
                        className="relative w-full overflow-hidden rounded-xl font-bold text-lg text-white shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none group"
                    >
                        {/* Button Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:scale-[1.02]"></div>

                        <div className="relative py-4 flex items-center justify-center gap-3 bg-black/10 backdrop-blur-sm">
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Initiating Sequence...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 text-cyan-200" />
                                    Generate Intelligence
                                </>
                            )}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}
