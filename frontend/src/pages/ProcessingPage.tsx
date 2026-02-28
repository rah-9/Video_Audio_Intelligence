import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobStatus } from '../api/apiClient';
import { ProgressBar } from '../components/ProgressBar';
import { BrainCircuit, AlertCircle } from 'lucide-react';

export function ProcessingPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const interval = setInterval(async () => {
            try {
                const data = await getJobStatus(jobId);
                setProgress(data.progress);
                setStatus(data.status);

                if (data.status === 'completed') {
                    clearInterval(interval);
                    navigate(`/result/${jobId}`);
                } else if (data.status === 'failed') {
                    clearInterval(interval);
                    setError(data.error_message || 'Processing failed');
                }
            } catch (err: any) {
                clearInterval(interval);
                setError(err.message || 'Failed to fetch status');
                setStatus('failed');
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [jobId, navigate]);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">

            {/* 4 Vibrant Ambient Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-cyan-500/15 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-pink-500/15 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-20 left-1/3 w-[35rem] h-[35rem] bg-purple-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] bg-primary-500/15 rounded-full mix-blend-screen filter blur-[90px] animate-blob" style={{ animationDelay: '6s' }}></div>

            <main className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center animate-slide-up">

                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-surfaceHighlight border border-zinc-800 shadow-2xl mb-4 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-lg animate-pulse-slow"></div>
                        <BrainCircuit className={`w-12 h-12 relative z-10 transition-colors duration-500 ${status === 'failed' ? 'text-red-500' : 'text-cyan-400 animate-pulse'}`} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
                        {status === 'failed' ? 'Analysis Failed' : 'Analyzing Intelligence'}
                    </h1>
                    <p className="text-zinc-400 font-medium tracking-wide">
                        {status === 'failed' ? 'Our neural net encountered an anomaly.' : 'Extracting insights from media space...'}
                    </p>
                </div>

                <div className="w-full">
                    {status === 'failed' ? (
                        <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center animate-fade-in shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-400 font-bold text-lg mb-8">{error}</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg border border-zinc-700 hover:border-zinc-600 w-full sm:w-auto transform hover:-translate-y-1"
                            >
                                Return Base
                            </button>
                        </div>
                    ) : (
                        <ProgressBar progress={progress} status={status as any} />
                    )}
                </div>
            </main>
        </div>
    );
}
