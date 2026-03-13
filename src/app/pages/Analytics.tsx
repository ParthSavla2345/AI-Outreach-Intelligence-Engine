import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

const strategyData = [
  { strategy: 'Value-First', success: 85, attempts: 120 },
  { strategy: 'Authority', success: 78, attempts: 95 },
  { strategy: 'Trigger', success: 82, attempts: 110 },
  { strategy: 'Social-Proof', success: 71, attempts: 88 },
  { strategy: 'Educational', success: 68, attempts: 102 },
];

const channelPerformance = [
  { month: 'Jan', linkedin: 65, email: 52, comment: 45, content: 38 },
  { month: 'Feb', linkedin: 68, email: 54, comment: 48, content: 40 },
  { month: 'Mar', linkedin: 70, email: 56, comment: 50, content: 42 },
  { month: 'Apr', linkedin: 72, email: 58, comment: 52, content: 44 },
  { month: 'May', linkedin: 75, email: 60, comment: 55, content: 46 },
  { month: 'Jun', linkedin: 78, email: 62, comment: 58, content: 48 },
];

const responseLatency = [
  { day: 'Mon', avgHours: 8.2 },
  { day: 'Tue', avgHours: 6.5 },
  { day: 'Wed', avgHours: 5.8 },
  { day: 'Thu', avgHours: 6.2 },
  { day: 'Fri', avgHours: 7.8 },
  { day: 'Sat', avgHours: 12.5 },
  { day: 'Sun', avgHours: 15.2 },
];

const rlImprovement = [
  { week: 'W1', accuracy: 62 },
  { week: 'W2', accuracy: 68 },
  { week: 'W3', accuracy: 72 },
  { week: 'W4', accuracy: 76 },
  { week: 'W5', accuracy: 79 },
  { week: 'W6', accuracy: 82 },
  { week: 'W7', accuracy: 84 },
  { week: 'W8', accuracy: 87 },
];

const timeFilters = ['7D', '30D', '90D', 'All'];

export function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('30D');

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Analytics</h1>
            <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
              Track performance and AI learning progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-[#1b263b] rounded-xl p-1 border border-[#415a77]/20">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#415a77] to-[#778da9] text-white shadow-sm'
                      : 'text-[#778da9] hover:bg-[#0d1b2a]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="p-2.5 rounded-xl bg-[#1b263b] border border-[#415a77]/20 hover:bg-[#0d1b2a] transition-colors">
              <Calendar className="w-5 h-5 text-[#778da9]" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Strategy Effectiveness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">Strategy Effectiveness</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strategyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b263b" />
              <XAxis dataKey="strategy" stroke="#778da9" style={{ fontSize: '12px' }} />
              <YAxis stroke="#778da9" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1b2a',
                  border: '1px solid #415a77',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="success" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#415a77" />
                  <stop offset="100%" stopColor="#778da9" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Channel Performance Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">
            Channel Performance Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={channelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b263b" />
              <XAxis dataKey="month" stroke="#778da9" style={{ fontSize: '12px' }} />
              <YAxis stroke="#778da9" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1b2a',
                  border: '1px solid #415a77',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="linkedin"
                stroke="#415a77"
                strokeWidth={3}
                dot={{ fill: '#415a77', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="email"
                stroke="#778da9"
                strokeWidth={3}
                dot={{ fill: '#778da9', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="comment"
                stroke="#8ea96c"
                strokeWidth={3}
                dot={{ fill: '#8ea96c', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="content"
                stroke="#b8956a"
                strokeWidth={3}
                dot={{ fill: '#b8956a', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Response Latency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
            style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
          >
            <h2 className="text-[18px] font-medium text-[#e0e1dd] mb-6">Response Latency Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={responseLatency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b263b" />
                <XAxis dataKey="day" stroke="#778da9" style={{ fontSize: '11px' }} />
                <YAxis stroke="#778da9" style={{ fontSize: '11px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1b2a',
                    border: '1px solid #415a77',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="avgHours" fill="#415a77" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* RL Learning Improvement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20"
            style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[18px] font-medium text-[#e0e1dd]">RL Learning Progress</h2>
                <p className="text-xs text-[#778da9]">Model accuracy improvement over time</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={rlImprovement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b263b" />
                <XAxis dataKey="week" stroke="#778da9" style={{ fontSize: '11px' }} />
                <YAxis stroke="#778da9" style={{ fontSize: '11px' }} domain={[60, 90]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1b2a',
                    border: '1px solid #415a77',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#778da9"
                  strokeWidth={3}
                  dot={{ fill: '#778da9', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-[#1b263b] rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#778da9]">Current Accuracy</span>
                <span className="text-[24px] font-medium text-[#e0e1dd]">87%</span>
              </div>
              <div className="mt-2 h-2 bg-[#1b263b] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#415a77] to-[#778da9]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#0d1b2a] to-[#1b263b]">
              <div className="text-sm text-[#778da9] mb-2">Best Performing Strategy</div>
              <div className="text-[24px] font-medium text-[#e0e1dd] mb-1">Value-First</div>
              <div className="text-xs text-[#778da9]">85% success rate</div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#0d1b2a] to-[#1b263b]">
              <div className="text-sm text-[#778da9] mb-2">Top Channel</div>
              <div className="text-[24px] font-medium text-[#e0e1dd] mb-1">LinkedIn DM</div>
              <div className="text-xs text-[#778da9]">+12% this month</div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#0d1b2a] to-[#1b263b]">
              <div className="text-sm text-[#778da9] mb-2">Optimal Time</div>
              <div className="text-[24px] font-medium text-[#e0e1dd] mb-1">2-4 PM</div>
              <div className="text-xs text-[#778da9]">Tue-Thu performs best</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
