import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, MessageSquare, FileText, Check } from 'lucide-react';

const channels = [
  {
    id: 'linkedin',
    name: 'LinkedIn DM',
    icon: Linkedin,
    probability: 68,
    responseRate: '24%',
    avgResponseTime: '4.2 hours',
    color: 'from-[#415a77] to-[#778da9]',
    template: 'Hi {name}, I noticed your recent post about {topic}. I thought you might find value in...',
    stats: {
      sent: 342,
      opened: 287,
      responded: 82,
    },
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    probability: 52,
    responseRate: '18%',
    avgResponseTime: '12 hours',
    color: 'from-[#415a77] to-[#e9bb8f]',
    template: 'Subject: Quick question about {company}\n\nHi {name},\n\nI came across {company} and...',
    stats: {
      sent: 589,
      opened: 412,
      responded: 106,
    },
  },
  {
    id: 'comment',
    name: 'Comment First',
    icon: MessageSquare,
    probability: 45,
    responseRate: '32%',
    avgResponseTime: '6 hours',
    color: 'from-[#8ea96c] to-[#415a77]',
    template: 'Great insights on {topic}! We\'ve seen similar results in our work with...',
    stats: {
      sent: 156,
      opened: 142,
      responded: 50,
    },
  },
  {
    id: 'content',
    name: 'Content Nurture',
    icon: FileText,
    probability: 38,
    responseRate: '15%',
    avgResponseTime: '3 days',
    color: 'from-[#1b263b] to-[#1b263b]',
    template: 'Check out our latest guide on {topic}. It covers strategies for...',
    stats: {
      sent: 824,
      opened: 658,
      responded: 124,
    },
  },
];

export function ChannelOptimizer() {
  const [selectedChannel, setSelectedChannel] = useState<string>('linkedin');

  const selected = channels.find((c) => c.id === selectedChannel);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Channel Optimizer</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          Compare and optimize your outreach channels
        </p>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {channels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedChannel(channel.id)}
            whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(65, 90, 119, 0.25)' }}
            className={`bg-[#1b263b] rounded-2xl p-6 cursor-pointer border-2 transition-all ${
              selectedChannel === channel.id
                ? 'border-[#415a77] shadow-lg'
                : 'border-[#415a77]/20 hover:border-[#415a77]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center`}
              >
                <channel.icon className="w-6 h-6 text-white" />
              </div>
              {selectedChannel === channel.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-[#415a77] flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
            <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">{channel.name}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-[#778da9] mb-2">
                  <span>Success Probability</span>
                  <span>{channel.probability}%</span>
                </div>
                <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${channel.probability}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${channel.color}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <p className="text-[10px] text-[#778da9]">Response Rate</p>
                  <p className="text-sm font-medium text-[#e0e1dd]">{channel.responseRate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#778da9]">Avg Time</p>
                  <p className="text-sm font-medium text-[#e0e1dd]">{channel.avgResponseTime}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Channel Details */}
      {selected && (
        <motion.div
          key={selectedChannel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Template Preview */}
            <div>
              <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">Template Preview</h3>
              <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] rounded-xl p-6 border border-[#415a77]/20">
                <div className="bg-[#1b263b] rounded-lg p-4 font-mono text-sm text-[#e0e1dd] whitespace-pre-wrap">
                  {selected.template}
                </div>
                <div className="mt-4 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2.5 rounded-lg bg-[#1b263b] border border-[#415a77]/30 text-[#e0e1dd] hover:bg-[#0d1b2a] transition-colors text-sm"
                  >
                    Edit Template
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#415a77] to-[#778da9] text-white shadow-md text-sm"
                  >
                    Use Template
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div>
              <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">Performance Statistics</h3>
              <div className="space-y-4">
                <div className="bg-[#0d1b2a] rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-[#778da9] mb-1">Sent</p>
                      <p className="text-[24px] font-medium text-[#e0e1dd]">
                        {selected.stats.sent}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#778da9] mb-1">Opened</p>
                      <p className="text-[24px] font-medium text-[#e0e1dd]">
                        {selected.stats.opened}
                      </p>
                      <p className="text-xs text-[#778da9]">
                        {Math.round((selected.stats.opened / selected.stats.sent) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#778da9] mb-1">Responded</p>
                      <p className="text-[24px] font-medium text-[#e0e1dd]">
                        {selected.stats.responded}
                      </p>
                      <p className="text-xs text-[#778da9]">
                        {Math.round((selected.stats.responded / selected.stats.sent) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1b263b] rounded-xl p-6 border border-[#415a77]/20">
                  <h4 className="text-sm font-medium text-[#e0e1dd] mb-4">Channel Insights</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-2" />
                      <div>
                        <p className="text-sm text-[#e0e1dd] mb-1">Best performing time</p>
                        <p className="text-xs text-[#778da9]">Tuesday-Thursday, 2-4 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-2" />
                      <div>
                        <p className="text-sm text-[#e0e1dd] mb-1">Optimal message length</p>
                        <p className="text-xs text-[#778da9]">120-180 characters</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#415a77] mt-2" />
                      <div>
                        <p className="text-sm text-[#e0e1dd] mb-1">Recommended frequency</p>
                        <p className="text-xs text-[#778da9]">Every 4-7 days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#415a77] to-[#778da9] rounded-xl p-6 text-white">
                  <h4 className="text-sm font-medium mb-2">AI Recommendation</h4>
                  <p className="text-sm opacity-90">
                    Based on current performance, we recommend using {selected.name} for high-priority
                    leads in the "Engaged" state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
