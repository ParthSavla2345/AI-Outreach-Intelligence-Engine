import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];

// Generate heatmap data (0-100 engagement score)
const heatmapData = days.map((day) =>
  hours.map(() => Math.floor(Math.random() * 60) + 40)
);

const getHeatColor = (value: number) => {
  if (value >= 85) return 'bg-[#415a77]';
  if (value >= 70) return 'bg-[#415a77]';
  if (value >= 55) return 'bg-[#1b263b]';
  return 'bg-[#1b263b]';
};

const optimalWindows = [
  { day: 'Tuesday', time: '2:00 PM - 4:00 PM', score: 94 },
  { day: 'Wednesday', time: '10:00 AM - 12:00 PM', score: 91 },
  { day: 'Thursday', time: '2:00 PM - 4:00 PM', score: 89 },
];

export function TimingInsights() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; hour: number } | null>(null);
  const [showIndustryComparison, setShowIndustryComparison] = useState(false);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Timing Insights</h1>
            <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
              Optimize when you reach out for maximum engagement
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowIndustryComparison(!showIndustryComparison)}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              showIndustryComparison
                ? 'bg-gradient-to-r from-[#415a77] to-[#778da9] text-white shadow-md'
                : 'bg-[#1b263b] border border-[#415a77]/50 text-[#e0e1dd] hover:bg-[#1b263b]'
            }`}
            style={{ fontSize: '14px' }}
          >
            {showIndustryComparison ? 'Hide' : 'Show'} Industry Comparison
          </motion.button>
        </div>
      </div>

      {/* Optimal Windows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {optimalWindows.map((window, index) => (
          <motion.div
            key={window.day}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(65, 90, 119, 0.18)' }}
            className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-6 border border-[#415a77]/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-[24px] font-medium text-[#e0e1dd]">{window.score}%</div>
                <div className="text-xs text-[#778da9]">Success Rate</div>
              </div>
            </div>
            <div className="text-sm font-medium text-[#e0e1dd] mb-1">{window.day}</div>
            <div className="text-xs text-[#778da9]">{window.time}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20 mb-8"
        style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-medium text-[#e0e1dd]">Engagement Heatmap</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#778da9]">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded bg-[#1b263b]" />
                <div className="w-4 h-4 rounded bg-[#1b263b]" />
                <div className="w-4 h-4 rounded bg-[#415a77]" />
                <div className="w-4 h-4 rounded bg-[#415a77]" />
              </div>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Hours header */}
            <div className="flex mb-2">
              <div className="w-28" />
              {hours.map((hour) => (
                <div key={hour} className="flex-1 min-w-[80px] text-center">
                  <span className="text-xs text-[#778da9]">{hour}</span>
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center mb-2">
                <div className="w-28 pr-4">
                  <span className="text-sm font-medium text-[#e0e1dd]">{day}</span>
                </div>
                {hours.map((hour, hourIndex) => {
                  const value = heatmapData[dayIndex][hourIndex];
                  const isHovered =
                    hoveredCell?.day === dayIndex && hoveredCell?.hour === hourIndex;
                  return (
                    <motion.div
                      key={`${day}-${hour}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (dayIndex * hours.length + hourIndex) * 0.01 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onMouseEnter={() => setHoveredCell({ day: dayIndex, hour: hourIndex })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`flex-1 min-w-[80px] h-16 mx-1 rounded-lg ${getHeatColor(
                        value
                      )} cursor-pointer relative transition-all`}
                    >
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#e0e1dd] text-white text-xs rounded-lg whitespace-nowrap z-20 shadow-lg"
                        >
                          {day} at {hour}
                          <div className="font-medium">{value}% engagement</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#e0e1dd] rotate-45" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Industry Comparison */}
      {showIndustryComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">Industry Benchmarks</h2>
              <p className="text-sm text-[#778da9]">Compare your timing with industry averages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1b263b] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">Your Performance</h3>
              <div className="space-y-3">
                {['Peak Response Time', 'Average Response Rate', 'Best Day'].map((metric, index) => (
                  <div key={metric}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#778da9]">{metric}</span>
                      <span className="text-[#e0e1dd] font-medium">
                        {index === 0 ? '2:30 PM' : index === 1 ? '68%' : 'Wednesday'}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${75 + index * 5}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-[#415a77] to-[#778da9]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1b263b] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">Industry Average</h3>
              <div className="space-y-3">
                {['Peak Response Time', 'Average Response Rate', 'Best Day'].map((metric, index) => (
                  <div key={metric}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#778da9]">{metric}</span>
                      <span className="text-[#e0e1dd] font-medium">
                        {index === 0 ? '3:00 PM' : index === 1 ? '54%' : 'Tuesday'}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${60 + index * 5}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-[#415a77]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
