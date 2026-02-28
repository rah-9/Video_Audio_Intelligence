import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadForm } from '../components/UploadForm';
import { processMedia } from '../api/apiClient';
import { Sparkles } from 'lucide-react';

export function HomePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (file?: File, url?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await processMedia(file, url);
            navigate(`/process/${result.job_id}`);
        } catch (err: any) {
            setError(err.response?.data?.detail || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* 4 Vibrant Ambient Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-cyan-500/15 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-pink-500/15 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-20 left-1/3 w-[35rem] h-[35rem] bg-purple-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] bg-primary-500/15 rounded-full mix-blend-screen filter blur-[90px] animate-blob" style={{ animationDelay: '6s' }}></div>

            <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center animate-slide-up">

                {/* Hero Header */}
                <div className="text-center mb-12 space-y-6">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surfaceHighlight border border-zinc-800 shadow-xl mb-2 group">
                        <Sparkles className="w-8 h-8 text-primary-400 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
                        AI Meeting <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-400 to-purple-400 animate-shimmer bg-[length:200%_auto]">
                            Intelligence
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Upload your local recordings or drop a YouTube link to instantly generate transcripts, summaries, action items, and queryable insights. 100% private and local.
                    </p>
                </div>

                {/* Upload Section */}
                <div className="w-full max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <UploadForm onSubmit={handleSubmit} isLoading={isLoading} />

                    {error && (
                        <div className="mt-6 w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium shadow-lg backdrop-blur-md transition-all duration-300 animate-fade-in">
                            {error}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
