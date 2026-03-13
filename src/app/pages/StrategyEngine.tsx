import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Lightbulb, Zap, Users, BookOpen } from 'lucide-react';

const strategies = [
  {
    id: 'authority',
    name: 'Authority-Based',
    icon: Target,
    description: 'Leverage expertise and thought leadership to build credibility',
    useCase: 'Best for C-level executives and decision makers',
    color: 'from-[#415a77] to-[#778da9]',
    successRate: 78,
  },
  {
    id: 'value',
    name: 'Value-First',
    icon: Lightbulb,
    description: 'Lead with immediate value and actionable insights',
    useCase: 'Ideal for engaged prospects seeking solutions',
    color: 'from-[#415a77] to-[#e9bb8f]',
    successRate: 85,
  },
  {
    id: 'trigger',
    name: 'Trigger-Based',
    icon: Zap,
    description: 'Act on real-time signals and buying intent',
    useCase: 'Perfect for time-sensitive opportunities',
    color: 'from-[#8ea96c] to-[#415a77]',
    successRate: 82,
  },
  {
    id: 'social',
    name: 'Social-Proof',
    icon: Users,
    description: 'Utilize testimonials and case studies',
    useCase: 'Effective for risk-averse prospects',
    color: 'from-[#1b263b] to-[#415a77]',
    successRate: 71,
  },
  {
    id: 'educational',
    name: 'Educational',
    icon: BookOpen,
    description: 'Nurture with educational content and resources',
    useCase: 'Great for early-stage leads',
    color: 'from-[#1b263b] to-[#1b263b]',
    successRate: 68,
  },
];

const flowSteps = [
  { label: 'Signals', description: 'Collect behavioral data', color: '#415a77' },
  { label: 'Score', description: 'Calculate priority', color: '#778da9' },
  { label: 'State', description: 'Determine lead state', color: '#8ea96c' },
  { label: 'Strategy', description: 'Select approach', color: '#b8956a' },
  { label: 'Channel', description: 'Choose platform', color: '#415a77' },
  { label: 'Timing', description: 'Optimize send time', color: '#778da9' },
];

export function StrategyEngine() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Strategy Engine</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          AI-powered decision engine for outreach strategies
        </p>
      </div>

      {/* AI Reasoning Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1b263b] rounded-2xl p-8 mb-8 border border-[#415a77]/20"
        style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
      >
        <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">AI Reasoning Flow</h2>
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
          {flowSteps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="text-lg font-medium mb-1">{step.label}</div>
                      <div className="text-[10px] opacity-90">{step.description}</div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1b263b] border-2 border-[#415a77] flex items-center justify-center text-xs font-medium text-[#778da9]"
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>
              {index < flowSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex-shrink-0"
                >
                  <ArrowRight className="w-6 h-6 text-[#415a77]" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Strategy Selection */}
      <div className="mb-8">
        <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">Strategy Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(65, 90, 119, 0.25)' }}
              onClick={() => setSelectedStrategy(strategy.id)}
              className={`bg-[#1b263b] rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                selectedStrategy === strategy.id
                  ? 'border-[#415a77] shadow-lg'
                  : 'border-[#415a77]/20 hover:border-[#415a77]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4`}
              >
                <strategy.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-2">{strategy.name}</h3>
              <p className="text-sm text-[#778da9] mb-4">{strategy.description}</p>
              <div className="bg-[#0d1b2a] rounded-lg p-3 mb-4">
                <p className="text-xs text-[#778da9] mb-1">Use Case</p>
                <p className="text-xs text-[#e0e1dd]">{strategy.useCase}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#778da9]">Success Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-[#1b263b] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${strategy.successRate}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${strategy.color}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#e0e1dd]">{strategy.successRate}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Strategy Details */}
      {selectedStrategy && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">
            {strategies.find((s) => s.id === selectedStrategy)?.name} Strategy Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1b263b] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-3">Key Tactics</h3>
              <ul className="space-y-2 text-sm text-[#778da9]">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-1.5" />
                  Personalized messaging
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-1.5" />
                  Multi-touch sequences
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-1.5" />
                  Value demonstration
                </li>
              </ul>
            </div>
            <div className="bg-[#1b263b] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-3">Best Channels</h3>
              <div className="space-y-2">
                {['LinkedIn DM', 'Email', 'Content Nurture'].map((channel) => (
                  <div key={channel} className="flex items-center justify-between text-sm">
                    <span className="text-[#778da9]">{channel}</span>
                    <div className="w-16 h-1.5 bg-[#1b263b] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#415a77]"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1b263b] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-3">Timing Insights</h3>
              <div className="space-y-2 text-sm text-[#778da9]">
                <div>
                  <span className="text-[#e0e1dd] font-medium">Best Days:</span> Tue, Wed, Thu
                </div>
                <div>
                  <span className="text-[#e0e1dd] font-medium">Optimal Time:</span> 2-4 PM
                </div>
                <div>
                  <span className="text-[#e0e1dd] font-medium">Frequency:</span> Every 3-5 days
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
