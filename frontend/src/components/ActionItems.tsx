import { CheckSquare, ListTodo } from 'lucide-react';
import type { ActionItem } from '../types/types';

interface ActionItemsProps {
    items: ActionItem[];
    decisions: string[];
}

export function ActionItems({ items, decisions }: ActionItemsProps) {
    if ((!items || items.length === 0) && (!decisions || decisions.length === 0)) return null;

    return (
        <div className="glass-panel text-white rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-800/80 relative group h-full flex flex-col">

            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>

            <div className="p-6 sm:p-8 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl relative z-10 flex-shrink-0">
                <h2 className="text-xl font-extrabold flex items-center gap-3 tracking-wide drop-shadow-sm group-hover:text-cyan-400 transition-colors">
                    <CheckSquare className="w-6 h-6 text-cyan-500 group-hover:text-pink-500 transition-colors duration-500" />
                    Action Items & Decisions
                </h2>
            </div>

            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-black/40">

                {items && items.length > 0 && (
                    <div className="animate-slide-up">
                        <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2 drop-shadow-sm">
                            <ListTodo className="w-4 h-4 text-cyan-500" /> Tasks
                        </h3>
                        <ul className="space-y-3">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors border border-zinc-800/80 hover:border-cyan-500/30 group/item">
                                    <div className="mt-0.5 bg-zinc-800 border border-zinc-700 w-5 h-5 rounded flex items-center justify-center shrink-0 group-hover/item:border-cyan-500/50 shadow-inner transition-colors">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500/0 group-hover/item:bg-cyan-500/50 transition-colors"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-zinc-300 font-medium leading-relaxed group-hover/item:text-zinc-200">{item.text}</p>
                                        {item.assignee && (
                                            <span className="inline-block mt-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
                                                @{item.assignee}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {decisions && decisions.length > 0 && (
                    <div className="animate-slide-up delay-75">
                        <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-4 drop-shadow-sm">Key Decisions</h3>
                        <ul className="space-y-3">
                            {decisions.map((decision, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-colors group/item relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/50 group-hover/item:bg-purple-400 transition-colors"></div>
                                    <p className="text-sm text-zinc-300 leading-relaxed font-medium ml-2 relative z-10 group-hover/item:text-zinc-200">
                                        {decision}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
