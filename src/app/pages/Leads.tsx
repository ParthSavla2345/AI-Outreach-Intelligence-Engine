import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, ArrowUpDown, Circle } from 'lucide-react';

const leadsData = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'VP of Sales',
    company: 'TechVision Inc.',
    state: 'Engaged',
    priority: 95,
    strategy: 'Value-First',
    channel: 'LinkedIn DM',
    lastContact: '2 days ago',
    engagement: 'High',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataFlow Systems',
    state: 'Warm',
    priority: 82,
    strategy: 'Authority-Based',
    channel: 'Email',
    lastContact: '5 days ago',
    engagement: 'Medium',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Director of Marketing',
    company: 'GrowthLab',
    state: 'Active',
    priority: 88,
    strategy: 'Trigger-Based',
    channel: 'Comment First',
    lastContact: '1 day ago',
    engagement: 'High',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'CEO',
    company: 'InnovateCorp',
    state: 'Cold',
    priority: 65,
    strategy: 'Educational',
    channel: 'Content Nurture',
    lastContact: '14 days ago',
    engagement: 'Low',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Product Manager',
    company: 'DesignHub',
    state: 'Dormant',
    priority: 45,
    strategy: 'Social-Proof',
    channel: 'LinkedIn DM',
    lastContact: '30 days ago',
    engagement: 'Low',
  },
];

const stateColors = {
  Cold: 'bg-[#1b263b] text-[#778da9]',
  Warm: 'bg-[#1b263b] text-[#778da9]',
  Engaged: 'bg-[#415a77]/20 text-[#778da9]',
  Active: 'bg-[#415a77] text-white',
  Dormant: 'bg-gray-200 text-gray-600',
};

export function Leads() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<typeof leadsData[0] | null>(null);
  const [sortColumn, setSortColumn] = useState('');

  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Leads</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          Manage and analyze your sales leads
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#1b263b] rounded-2xl p-6 mb-6 border border-[#415a77]/20">
        <div className="flex items-center gap-4">
          <motion.div
            initial={false}
            animate={{ width: searchExpanded ? 300 : 200 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#778da9]" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchExpanded(true)}
              onBlur={() => !searchQuery && setSearchExpanded(false)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0d1b2a] border border-[#415a77]/30 focus:outline-none focus:border-[#415a77] transition-colors text-sm"
            />
          </motion.div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#415a77]/30 hover:bg-[#0d1b2a] transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="ml-auto text-sm text-[#778da9]">
            {filteredLeads.length} leads
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1b263b] rounded-2xl border border-[#415a77]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] border-b border-[#415a77]/20">
              <tr>
                {['Name', 'Role', 'Company', 'State', 'Priority', 'Strategy', 'Channel'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-medium text-[#e0e1dd] cursor-pointer hover:bg-[#1b263b] transition-colors"
                    onClick={() => setSortColumn(header)}
                  >
                    <div className="flex items-center gap-2">
                      {header}
                      <ArrowUpDown className="w-3 h-3 text-[#778da9]" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedLead(lead)}
                  className="border-b border-[#415a77]/10 hover:bg-[#0d1b2a] cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#e0e1dd] text-sm">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#778da9]">{lead.role}</td>
                  <td className="px-6 py-4 text-sm text-[#778da9]">{lead.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        stateColors[lead.state as keyof typeof stateColors]
                      }`}
                    >
                      <Circle className="w-2 h-2 fill-current" />
                      {lead.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#1b263b] rounded-full overflow-hidden max-w-[60px]">
                        <div
                          className="h-full bg-gradient-to-r from-[#415a77] to-[#778da9]"
                          style={{ width: `${lead.priority}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#e0e1dd] font-medium">{lead.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#778da9]">{lead.strategy}</td>
                  <td className="px-6 py-4 text-sm text-[#778da9]">{lead.channel}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[480px] bg-[#1b263b] shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-1">
                      {selectedLead.name}
                    </h2>
                    <p className="text-[#778da9]">{selectedLead.role}</p>
                    <p className="text-[#778da9] text-sm">{selectedLead.company}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="w-8 h-8 rounded-full hover:bg-[#0d1b2a] flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-[#778da9]" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] rounded-xl p-6">
                    <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">Lead Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[#778da9] mb-1">State</p>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            stateColors[selectedLead.state as keyof typeof stateColors]
                          }`}
                        >
                          <Circle className="w-2 h-2 fill-current" />
                          {selectedLead.state}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-[#778da9] mb-1">Priority Score</p>
                        <p className="text-lg font-medium text-[#e0e1dd]">{selectedLead.priority}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#778da9] mb-1">Last Contact</p>
                        <p className="text-sm text-[#e0e1dd]">{selectedLead.lastContact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#778da9] mb-1">Engagement</p>
                        <p className="text-sm text-[#e0e1dd]">{selectedLead.engagement}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">AI Strategy Breakdown</h3>
                    <div className="space-y-3">
                      <div className="bg-[#0d1b2a] rounded-lg p-4">
                        <p className="text-xs text-[#778da9] mb-1">Recommended Strategy</p>
                        <p className="text-sm font-medium text-[#e0e1dd]">{selectedLead.strategy}</p>
                      </div>
                      <div className="bg-[#0d1b2a] rounded-lg p-4">
                        <p className="text-xs text-[#778da9] mb-1">Best Channel</p>
                        <p className="text-sm font-medium text-[#e0e1dd]">{selectedLead.channel}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#e0e1dd] mb-4">Engagement Timeline</h3>
                    <div className="space-y-4">
                      {[
                        { date: '2 days ago', event: 'Viewed LinkedIn profile', type: 'engagement' },
                        { date: '5 days ago', event: 'Opened email', type: 'engagement' },
                        { date: '7 days ago', event: 'Downloaded whitepaper', type: 'conversion' },
                        { date: '10 days ago', event: 'First contact made', type: 'outreach' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#415a77] mt-2" />
                          <div className="flex-1">
                            <p className="text-sm text-[#e0e1dd]">{item.event}</p>
                            <p className="text-xs text-[#778da9]">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#415a77] to-[#778da9] text-white font-medium shadow-md"
                  >
                    Run Re-analysis
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
