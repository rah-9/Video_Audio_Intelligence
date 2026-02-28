import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResult } from '../api/apiClient';
import type { ProcessResult } from '../types/types';
import { SummaryCard } from '../components/SummaryCard';
import { TopicSection } from '../components/TopicSection';
import { ActionItems } from '../components/ActionItems';
import { QAPanel } from '../components/QAPanel';
import { Loader2, ArrowLeft, Download, Sparkles } from 'lucide-react';

export function ResultPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const [result, setResult] = useState<ProcessResult | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!jobId) return;
        getResult(jobId)
            .then(setResult)
            .catch(err => setError(err.message || 'Failed to load results'));
    }, [jobId]);

    const handleDownload = () => {
        if (!result) return;
        const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meeting-intel-${jobId}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
                <p className="text-red-400 mb-6 font-medium bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">{error}</p>
                <button onClick={() => navigate('/')} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all shadow-lg border border-zinc-700 transform hover:-translate-y-1">Return Base</button>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex flex-col space-y-6 items-center justify-center bg-background text-cyan-400">
                <Loader2 className="w-12 h-12 animate-spin drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <p className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase">Formulating Intelligence</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-zinc-100 pb-16 relative overflow-x-hidden">

            {/* Ambient Background Glow */}
            <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-900/10 via-background to-transparent pointer-events-none"></div>

            <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/80 rounded-none shadow-xl transform-gpu">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold bg-zinc-900/50 hover:bg-zinc-800 px-5 py-2.5 rounded-xl transition-all border border-zinc-800 hover:border-zinc-600 group shadow-lg">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Start Over</span>
                    </button>

                    <h1 className="text-2xl font-black text-white flex items-center gap-3 truncate px-4 group">
                        <Sparkles className="w-6 h-6 text-cyan-400 group-hover:text-pink-400 transition-colors duration-500" />
                        <span className="hidden sm:inline">Intelligence</span> Report
                    </h1>

                    <button onClick={handleDownload} className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-pink-300 hover:bg-pink-500/20 px-5 py-2.5 rounded-xl font-bold transition-all border border-pink-500/30 hover:border-pink-500/50 shadow-[0_0_15px_rgba(2db,39,119,0.1)] hover:shadow-[0_0_20px_rgba(2db,39,119,0.3)]">
                        <Download className="w-5 h-5" /> <span className="hidden sm:inline">Export JSON</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 animate-fade-in">
                <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <SummaryCard shortSummary={result.summary_short} detailedSummary={result.summary_detailed} />
                    <TopicSection topics={result.topics} />
                </div>
                <div className="space-y-8 flex flex-col animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex-1">
                        <QAPanel jobId={result.job_id} />
                    </div>
                    <div className="flex-1">
                        <ActionItems items={result.action_items} decisions={result.decisions} />
                    </div>
                </div>
            </main>
        </div>
    );
}
