import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Target, Activity, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ConfidenceRing } from '../components/ConfidenceRing';
import { ConversionFunnel } from '../components/ConversionFunnel';

const kpiData = [
  { label: 'Active Leads', value: 247, icon: Users, trend: '+12%', color: 'from-[#415a77] to-[#1b263b]' },
  { label: 'High Priority', value: 43, icon: Target, trend: '+8%', color: 'from-[#415a77] to-[#e9bb8f]' },
  { label: 'Conversion Rate', value: 32, suffix: '%', icon: TrendingUp, trend: '+5%', color: 'from-[#415a77] to-[#778da9]' },
  { label: 'Engagement Rate', value: 68, suffix: '%', icon: Activity, trend: '+15%', color: 'from-[#1b263b] to-[#415a77]' },
];

const aiRecommendation = {
  leadName: 'Sarah Mitchell',
  company: 'TechVision Inc.',
  strategy: 'Value-First Approach',
  channel: 'LinkedIn DM',
  timeWindow: 'Today, 2:00 PM - 4:00 PM',
  confidence: 87,
  rationale: [
    { factor: 'Recent content engagement', importance: 95 },
    { factor: 'Job change trigger detected', importance: 88 },
    { factor: 'Mutual connections (3)', importance: 76 },
    { factor: 'Industry trending topic match', importance: 72 },
    { factor: 'Historical response pattern', importance: 65 },
  ],
};

export function Dashboard() {
  const [showRationale, setShowRationale] = useState(false);

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Dashboard</h1>
          <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-xl bg-[#1b263b] border border-[#415a77]/30 text-[#e0e1dd] hover:bg-[#1b263b] transition-colors"
            style={{ fontSize: '14px' }}
          >
            Add Lead
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#415a77] to-[#778da9] text-white shadow-md hover:shadow-lg transition-all"
            style={{ fontSize: '14px' }}
          >
            Run AI Analysis
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(65, 90, 119, 0.18)' }}
            className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
            style={{ boxShadow: '0 2px 8px rgba(65, 90, 119, 0.10)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}
              >
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[#778da9] text-xs font-medium">{kpi.trend}</span>
            </div>
            <div className="mb-1">
              <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />
            </div>
            <p className="text-[#778da9] text-sm">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">Recommended Action Today</h2>
              <p className="text-[#778da9] text-sm">AI-powered suggestion based on real-time signals</p>
            </div>
          </div>

          <div className="bg-[#0d1b2a] rounded-xl p-6 mb-4">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-1">
                  {aiRecommendation.leadName}
                </h3>
                <p className="text-[#778da9] text-sm">{aiRecommendation.company}</p>
              </div>
              <ConfidenceRing value={aiRecommendation.confidence} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0d1b2a] rounded-lg p-4">
                <p className="text-[#778da9] text-xs mb-1">Strategy</p>
                <p className="text-[#e0e1dd] font-medium text-sm">{aiRecommendation.strategy}</p>
              </div>
              <div className="bg-[#0d1b2a] rounded-lg p-4">
                <p className="text-[#778da9] text-xs mb-1">Channel</p>
                <p className="text-[#e0e1dd] font-medium text-sm">{aiRecommendation.channel}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1b263b] to-[#1b263b] rounded-lg p-4">
              <p className="text-[#778da9] text-xs mb-1">Best Time Window</p>
              <p className="text-[#e0e1dd] font-medium text-sm">{aiRecommendation.timeWindow}</p>
            </div>
          </div>

          <motion.button
            onClick={() => setShowRationale(!showRationale)}
            className="w-full flex items-center justify-center gap-2 py-3 text-[#778da9] font-medium hover:bg-[#1b263b] rounded-xl transition-colors"
            style={{ fontSize: '14px' }}
          >
            {showRationale ? 'Hide Rationale' : 'View Rationale'}
            {showRationale ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>

          <motion.div
            initial={false}
            animate={{ height: showRationale ? 'auto' : 0, opacity: showRationale ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-3">
              <h4 className="text-sm font-medium text-[#e0e1dd] mb-4">Top Decision Factors</h4>
              {aiRecommendation.rationale.map((item, index) => (
                <motion.div
                  key={item.factor}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#e0e1dd]">{item.factor}</span>
                    <span className="text-[#778da9]">{item.importance}%</span>
                  </div>
                  <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.importance}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-[#415a77] to-[#778da9]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-6">Conversion Funnel</h3>
          <ConversionFunnel />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
        style={{ boxShadow: '0 2px 8px rgba(65, 90, 119, 0.10)' }}
      >
        <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl border-2 border-dashed border-[#415a77] text-[#e0e1dd] hover:bg-[#0d1b2a] transition-colors text-left"
          >
            <div className="text-lg mb-1">📝</div>
            <div className="font-medium mb-1" style={{ fontSize: '14px' }}>Generate Content</div>
            <div className="text-xs text-[#778da9]">Create personalized outreach messages</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl border-2 border-dashed border-[#415a77] text-[#e0e1dd] hover:bg-[#0d1b2a] transition-colors text-left"
          >
            <div className="text-lg mb-1">🎯</div>
            <div className="font-medium mb-1" style={{ fontSize: '14px' }}>Strategy Analysis</div>
            <div className="text-xs text-[#778da9]">Get AI-powered strategy recommendations</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl border-2 border-dashed border-[#415a77] text-[#e0e1dd] hover:bg-[#0d1b2a] transition-colors text-left"
          >
            <div className="text-lg mb-1">📊</div>
            <div className="font-medium mb-1" style={{ fontSize: '14px' }}>View Analytics</div>
            <div className="text-xs text-[#778da9]">Track performance and insights</div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
