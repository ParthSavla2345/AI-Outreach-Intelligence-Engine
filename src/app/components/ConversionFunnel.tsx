import { motion } from 'motion/react';

const funnelData = [
  { stage: 'Cold Leads', count: 500, percentage: 100, color: 'from-[#1b263b] to-[#415a77]' },
  { stage: 'Engaged', count: 320, percentage: 64, color: 'from-[#415a77] to-[#778da9]' },
  { stage: 'Qualified', count: 180, percentage: 36, color: 'from-[#415a77] to-[#778da9]' },
  { stage: 'Converted', count: 85, percentage: 17, color: 'from-[#b8956a] to-[#a68558]' },
];

export function ConversionFunnel() {
  return (
    <div className="space-y-4">
      {funnelData.map((stage, index) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#e0e1dd] font-medium">{stage.stage}</span>
            <span className="text-[#778da9]">{stage.count}</span>
          </div>
          <div className="relative h-12 rounded-xl overflow-hidden bg-[#0d1b2a]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stage.percentage}%` }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.8, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${stage.color} flex items-center justify-center`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.6 }}
                className="text-white text-xs font-medium"
              >
                {stage.percentage}%
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
