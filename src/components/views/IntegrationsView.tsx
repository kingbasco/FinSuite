import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { ToolIntegration } from '../../types';
import { TOOL_INTEGRATIONS } from '../../data/mockData';
import { ToolIcon } from '../common/BrandIcons';
import { AnimatedButton } from '../common/AnimatedButton';

interface IntegrationsViewProps {
  onShowToast: (title: string, desc?: string) => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({ onShowToast }) => {
  const [tools, setTools] = useState<ToolIntegration[]>(TOOL_INTEGRATIONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const categories = ['all', 'Communication', 'Workspace', 'Design Tools', 'Cloud Storage'];

  const filteredTools = tools.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleToggleConnect = (tool: ToolIntegration) => {
    setProcessingId(tool.id);
    setTimeout(() => {
      setProcessingId(null);
      const nextState = !tool.connected;
      setTools((prev) =>
        prev.map((item) => (item.id === tool.id ? { ...item, connected: nextState } : item))
      );
      onShowToast(
        nextState ? `${tool.name} Connected` : `${tool.name} Disconnected`,
        nextState
          ? `Real-time synchronization enabled for ${tool.name}.`
          : `Sync stream paused for ${tool.name}.`
      );
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>FinSuite Integration Ecosystem</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Integrate With Your <span className="text-blue-600">Favorite</span> Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Automate transactions, receipt extraction, and team approval alerts with seamless integrations to your everyday apps.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 shadow-xs">
                  <ToolIcon name={tool.iconName} className="w-7 h-7" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    tool.connected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tool.connected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  {tool.connected ? 'Active' : 'Not Connected'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{tool.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Sync: {tool.syncFrequency}</span>
              <AnimatedButton
                variant={tool.connected ? 'outline' : 'blue'}
                size="sm"
                isLoading={processingId === tool.id}
                onClick={() => handleToggleConnect(tool)}
              >
                {tool.connected ? 'Disconnect' : 'Connect'}
              </AnimatedButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
