import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FinSuiteLogo, ToolIcon } from './BrandIcons';
import { TOOL_INTEGRATIONS } from '../../data/mockData';
import { Check, Plus } from 'lucide-react';

interface IntegrationNetworkProps {
  onSelectIntegration?: (id: string) => void;
}

export const IntegrationNetwork: React.FC<IntegrationNetworkProps> = ({ onSelectIntegration }) => {
  const [activeId, setActiveId] = useState<string | null>('slack');
  const [integrations, setIntegrations] = useState(TOOL_INTEGRATIONS);

  // Position nodes in radial geometry
  const nodePositions = [
    { x: 50, y: 12 },   // Top (Slack)
    { x: 80, y: 22 },   // Top Right (Figma)
    { x: 92, y: 55 },   // Right (Messenger)
    { x: 80, y: 88 },   // Bottom Right (Gmail)
    { x: 50, y: 92 },   // Bottom (Notion)
    { x: 20, y: 88 },   // Bottom Left (Instagram)
    { x: 8, y: 55 },    // Left (Chrome)
    { x: 20, y: 22 },   // Top Left (Drive)
  ];

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
    if (onSelectIntegration) onSelectIntegration(id);
  };

  const selectedTool = integrations.find((i) => i.id === activeId);

  return (
    <div className="relative w-full aspect-[4/3] max-w-xl mx-auto flex items-center justify-center select-none">
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="active-line-grad" x1="50" y1="50" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {nodePositions.map((pos, idx) => {
          const tool = integrations[idx % integrations.length];
          const isActive = tool.id === activeId;
          return (
            <g key={tool.id}>
              {/* Static line */}
              <line
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke={isActive ? '#3B82F6' : '#E2E8F0'}
                strokeWidth={isActive ? '1.5' : '0.8'}
                strokeDasharray={isActive ? 'none' : '2,2'}
                className="transition-colors duration-300"
              />
              {/* Animated pulse dot along line */}
              {tool.connected && (
                <circle r="1" fill="#3B82F6">
                  <animateMotion
                    path={`M50,50 L${pos.x},${pos.y}`}
                    dur={`${2.5 + (idx % 3) * 0.8}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Hub: FinSuite */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-xl border border-slate-200/80 flex items-center justify-center p-3 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 animate-ping pointer-events-none opacity-50" />
        <FinSuiteLogo className="w-10 h-10" showText={false} />
      </motion.div>

      {/* Radial Tool Nodes */}
      {nodePositions.map((pos, idx) => {
        const tool = integrations[idx % integrations.length];
        const isSelected = tool.id === activeId;
        return (
          <motion.div
            key={tool.id}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveId(tool.id)}
            className={`absolute z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 border ${
              isSelected
                ? 'border-blue-500 shadow-blue-500/20 ring-4 ring-blue-50'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <ToolIcon name={tool.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Status indicator badge */}
            <span
              className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                tool.connected ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              {tool.connected ? (
                <Check className="w-2 h-2 text-white stroke-[3]" />
              ) : (
                <Plus className="w-2 h-2 text-white stroke-[3]" />
              )}
            </span>
          </motion.div>
        );
      })}

      {/* Active Tool Info Popup */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key={selectedTool.id}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 w-[92%] max-w-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <ToolIcon name={selectedTool.iconName} className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">{selectedTool.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedTool.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                  {selectedTool.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">{selectedTool.description}</p>
            </div>
            <button
              onClick={(e) => handleToggle(selectedTool.id, e)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors shrink-0 ${
                selectedTool.connected
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {selectedTool.connected ? 'Disconnect' : 'Connect'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
