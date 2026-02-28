import React, { useState } from 'react';
import { Search, Loader2, MessageSquare, Bot, User } from 'lucide-react';
import { askQuestion } from '../api/apiClient';

interface QAPanelProps {
    jobId: string;
}

export function QAPanel({ jobId }: QAPanelProps) {
    const [query, setQuery] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsAsking(true);
        const currentQuery = query;
        setQuery('');

        try {
            // Keep the last 4 exchanges to avoid hitting token limits
            const contextHistory = history.slice(0, 4);
            const res = await askQuestion(jobId, currentQuery, contextHistory);
            setHistory(prev => [{ q: currentQuery, a: res.answer }, ...prev]);
        } catch (error) {
            console.error("Failed to ask question", error);
            setHistory(prev => [{ q: currentQuery, a: "Sorry, an error occurred while searching to answer your question." }, ...prev]);
        } finally {
            setIsAsking(false);
        }
    };

    return (
        <div className="glass-panel text-white rounded-[2rem] shadow-2xl h-full flex flex-col border border-zinc-800/80 overflow-hidden relative group">

            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/15 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-purple-500/15 transition-colors duration-700"></div>

            <div className="p-6 sm:p-8 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl relative z-10">
                <h2 className="text-xl font-extrabold flex items-center gap-3 tracking-wide drop-shadow-sm group-hover:text-cyan-400 transition-colors">
                    <MessageSquare className="w-6 h-6 text-cyan-500 group-hover:text-pink-500 transition-colors duration-500" />
                    Neural Query (RAG)
                </h2>
                <p className="mt-2 text-sm text-zinc-400 font-medium">
                    Ask questions about the media contents using our local semantic search network.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-h-[500px] bg-black/40 custom-scrollbar relative z-10">
                {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 min-h-[200px] animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex flex-col items-center justify-center mb-4 border border-zinc-800 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-shadow">
                            <Bot className="w-8 h-8 text-cyan-500/50 group-hover:text-cyan-400/80 transition-colors animate-pulse-slow" />
                        </div>
                        <p className="font-bold text-zinc-400 drop-shadow-sm">Ready for queries.</p>
                        <p className="text-sm mt-1">Try asking for specific details or summaries.</p>
                    </div>
                ) : (
                    history.map((item, idx) => (
                        <div key={idx} className="space-y-4 animate-slide-up">
                            {/* User Bubble */}
                            <div className="flex justify-end items-end gap-3">
                                <div className="bg-zinc-800 border border-zinc-700/80 text-white rounded-2xl rounded-tr-sm px-6 py-4 max-w-[85%] text-sm shadow-xl font-medium">
                                    {item.q}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* AI Bubble */}
                            <div className="flex justify-start items-end gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-surfaceHighlight border border-zinc-800/80 text-zinc-200 rounded-2xl rounded-tl-sm px-6 py-4 max-w-[90%] text-sm leading-relaxed shadow-xl backdrop-blur-sm">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {isAsking && (
                    <div className="flex justify-start items-end gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <Bot className="w-4 h-4 text-white animate-pulse" />
                        </div>
                        <div className="bg-surfaceHighlight border border-cyan-500/30 text-cyan-100 rounded-2xl rounded-tl-sm px-6 py-4 max-w-[90%] text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                            Searching vector space & generating answer...
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 bg-zinc-950/80 border-t border-zinc-800/80 rounded-b-[2rem] backdrop-blur-xl relative z-10">
                <form onSubmit={handleAsk} className="relative group/form">
                    <input
                        type="text"
                        className="w-full pl-6 pr-16 py-4 sm:py-5 bg-black border border-zinc-800 rounded-2xl focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-sm sm:text-base text-white placeholder-zinc-600 group-hover/form:border-zinc-700 outline-none shadow-inner"
                        placeholder="Ask anything about the media..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isAsking}
                    />
                    <button
                        type="submit"
                        disabled={!query.trim() || isAsking}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:grayscale transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transform hover:scale-105 active:scale-95"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
