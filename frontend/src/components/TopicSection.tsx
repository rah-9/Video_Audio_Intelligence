import { Network, Clock } from 'lucide-react';
import type { Topic } from '../types/types';

interface TopicSectionProps {
    topics: Topic[];
}


export function TopicSection({ topics }: TopicSectionProps) {
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!topics || topics.length === 0) return null;

    return (
        <div className="glass-panel text-white rounded-[2rem] shadow-2xl p-6 sm:p-8 border border-zinc-800/80 relative overflow-hidden group">

            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-pink-500/20 transition-colors duration-700"></div>

            <h2 className="text-xl font-extrabold flex items-center gap-3 tracking-wide drop-shadow-sm mb-8 relative z-10 group-hover:text-pink-400 transition-colors">
                <Network className="w-6 h-6 text-pink-500 group-hover:text-cyan-500 transition-colors duration-500" />
                Discussion Topics
            </h2>

            <div className="space-y-6 relative ml-2 z-10">
                {/* Timeline base line */}
                <div className="absolute top-2 bottom-4 left-[9px] w-[2px] bg-zinc-800"></div>

                {topics.map((topic, idx) => (
                    <div key={idx} className="relative group/item pl-8">
                        {/* Timeline dot */}
                        <div className="absolute left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-zinc-700 border-2 border-background group-hover/item:bg-pink-500 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(236,72,153,0)] group-hover/item:shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>

                        <div className="bg-zinc-950/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:border-pink-500/30">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                                <h3 className="text-lg font-extrabold text-white group-hover/item:text-pink-300 transition-colors">{topic.name}</h3>
                                <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-inner gap-1 tracking-wider">
                                    <Clock className="w-3.5 h-3.5" />
                                    {formatTime(topic.start_time)} - {formatTime(topic.end_time)}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed font-medium group-hover/item:text-zinc-300 transition-colors duration-300">
                                {topic.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
