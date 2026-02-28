import { AlignLeft, Copy } from 'lucide-react';

interface SummaryCardProps {
    shortSummary: string;
    detailedSummary: string;
}

export function SummaryCard({ shortSummary, detailedSummary }: SummaryCardProps) {
    return (
        <div className="glass-panel text-white rounded-[2rem] shadow-2xl p-6 sm:p-8 space-y-8 border border-zinc-800/80 relative overflow-hidden group">

            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>

            <div className="relative z-10">
                <h2 className="text-xl font-extrabold flex items-center gap-3 tracking-wide drop-shadow-sm group-hover:text-cyan-400 transition-colors">
                    <AlignLeft className="w-6 h-6 text-cyan-500 group-hover:text-pink-500 transition-colors duration-500" />
                    Executive Brief
                </h2>
                <div className="mt-6 bg-zinc-950/60 backdrop-blur-md rounded-2xl p-6 border border-zinc-800/80 shadow-lg relative group/inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover/inner:opacity-100 transition-opacity rounded-2xl"></div>
                    <p className="text-zinc-200 leading-relaxed font-medium relative z-10 text-lg">
                        {shortSummary || "No short summary generated."}
                    </p>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-300 drop-shadow-sm group-hover:text-purple-400 transition-colors">
                    <Copy className="w-5 h-5 text-purple-500 group-hover:text-cyan-500 transition-colors duration-500" />
                    Comprehensive Analysis
                </h3>
                <div className="mt-4 bg-black/40 rounded-2xl p-6 border border-zinc-900 shadow-inner max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="prose prose-invert prose-zinc max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-pink-400">
                        {detailedSummary.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0 text-zinc-300">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
