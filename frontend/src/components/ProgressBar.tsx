import React from 'react';
import { Loader2, CheckCircle, Database, FileAudio, FileText, BrainCircuit } from 'lucide-react';

export type JobStatusType = 'pending' | 'downloading' | 'extracting_audio' | 'transcribing' | 'cleaning' | 'embedding' | 'clustering' | 'summarizing' | 'completed' | 'failed';

export interface ProgressBarProps {
    status: JobStatusType;
    progress: number;
}

const steps: { key: JobStatusType; label: string; icon: React.ReactNode }[] = [
    { key: 'downloading', label: 'Acquiring Media', icon: <Database className="w-5 h-5" /> },
    { key: 'extracting_audio', label: 'Audio Extraction', icon: <FileAudio className="w-5 h-5" /> },
    { key: 'transcribing', label: 'Neural Transcription', icon: <FileText className="w-5 h-5" /> },
    { key: 'cleaning', label: 'Data Cleansing', icon: <Loader2 className="w-5 h-5 animate-spin" /> },
    { key: 'embedding', label: 'Vectorization', icon: <BrainCircuit className="w-5 h-5" /> },
    { key: 'clustering', label: 'Synthesizing Topics', icon: <BrainCircuit className="w-5 h-5" /> },
    { key: 'summarizing', label: 'Intelligence Generation', icon: <CheckCircle className="w-5 h-5" /> },
];

export function ProgressBar({ status, progress }: ProgressBarProps) {

    // Determine the active step index based on the current status
    const currentStepIndex = steps.findIndex(s => s.key === status);

    // If pending, downloading, or completed/failed, handle specially, else we are in the pipeline
    const isCompleted = status === 'completed';
    const isFailed = status === 'failed';
    const displayIndex = isCompleted ? steps.length : (currentStepIndex === -1 ? 0 : currentStepIndex);

    return (
        <div className="w-full glass-panel bg-surface/90 border border-zinc-800/80 p-6 sm:p-8 rounded-[2rem] shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none"></div>

            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-zinc-200 font-extrabold text-lg tracking-wide uppercase drop-shadow-sm flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-500 hover:text-pink-500 transition-colors" />
                    System Status
                </h3>
                <span className="text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    {Math.round(progress)}%
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 shadow-inner mb-8">
                <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {steps.map((step, idx) => {
                    const isActive = idx === displayIndex && !isCompleted && !isFailed;
                    const isPast = idx < displayIndex || isCompleted;

                    let iconColor = "text-zinc-600";
                    let bgColor = "bg-zinc-900 border-zinc-800";
                    let textColor = "text-zinc-500 font-medium";

                    if (isPast) {
                        iconColor = "text-cyan-400";
                        bgColor = "bg-zinc-800/50 border-cyan-500/30";
                        textColor = "text-zinc-300 font-semibold";
                    } else if (isActive) {
                        iconColor = "text-pink-400 animate-pulse";
                        bgColor = "bg-zinc-800 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.1)]";
                        textColor = "text-white font-extrabold";
                    }

                    return (
                        <div key={step.key} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'scale-[1.02] transform' : ''}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 shadow-lg ${bgColor} ${iconColor}`}>
                                {isPast ? <CheckCircle className="w-6 h-6" /> : step.icon}
                            </div>
                            <div className={`flex-1 transition-colors duration-500 text-sm sm:text-base ${textColor}`}>
                                {step.label}
                                {isActive && <span className="ml-3 inline-block w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
