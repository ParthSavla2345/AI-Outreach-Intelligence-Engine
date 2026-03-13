import { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Users, Award, TrendingUp } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: 'lead' | 'connection' | 'influencer';
  influence: number;
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: '1', name: 'Sarah Mitchell', type: 'lead', influence: 95, x: 50, y: 50 },
  { id: '2', name: 'John Davis', type: 'connection', influence: 72, x: 30, y: 40 },
  { id: '3', name: 'Emma Wilson', type: 'connection', influence: 68, x: 70, y: 40 },
  { id: '4', name: 'Mike Chen', type: 'influencer', influence: 88, x: 50, y: 25 },
  { id: '5', name: 'Lisa Park', type: 'connection', influence: 65, x: 35, y: 65 },
  { id: '6', name: 'David Lee', type: 'connection', influence: 70, x: 65, y: 65 },
];

const connections = [
  { from: '1', to: '2', strength: 0.8 },
  { from: '1', to: '3', strength: 0.6 },
  { from: '1', to: '4', strength: 0.9 },
  { from: '1', to: '5', strength: 0.7 },
  { from: '1', to: '6', strength: 0.5 },
  { from: '2', to: '4', strength: 0.4 },
  { from: '3', to: '4', strength: 0.5 },
];

const communities = [
  { name: 'Tech Leaders', members: 8, avgInfluence: 82, color: '#415a77' },
  { name: 'Marketing Pros', members: 12, avgInfluence: 76, color: '#778da9' },
  { name: 'Sales Executives', members: 6, avgInfluence: 88, color: '#8ea96c' },
];

export function GraphIntelligence() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const getNodeColor = (type: Node['type']) => {
    switch (type) {
      case 'lead':
        return 'from-[#415a77] to-[#778da9]';
      case 'influencer':
        return 'from-[#415a77] to-[#8ea96c]';
      default:
        return 'from-[#1b263b] to-[#415a77]';
    }
  };

  const getNodeSize = (influence: number) => {
    return 12 + (influence / 100) * 24;
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Graph Intelligence</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          Visualize and leverage your network connections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Graph */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20 h-[600px] relative"
            style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">Network Map</h2>
              <div className="flex gap-2">
                {['All', 'Influencers', 'Connections'].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1.5 text-xs rounded-lg border border-[#415a77]/30 hover:bg-[#0d1b2a] transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Network Graph */}
            <svg className="w-full h-full">
              {/* Draw connections first */}
              {connections.map((conn, index) => {
                const fromNode = nodes.find((n) => n.id === conn.from);
                const toNode = nodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke="#415a77"
                    strokeWidth={conn.strength * 2}
                    strokeOpacity={0.4}
                    className="transition-all"
                  />
                );
              })}

              {/* Draw nodes */}
              {nodes.map((node, index) => {
                const size = getNodeSize(node.influence);
                const isHovered = hoveredNode === node.id;
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g key={node.id}>
                    {/* Node pulse animation for influencers */}
                    {node.type === 'influencer' && (
                      <motion.circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={size + 4}
                        fill="none"
                        stroke="#778da9"
                        strokeWidth="2"
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{
                          opacity: [0.8, 0.2, 0.8],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Main node circle */}
                    <motion.circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r={size}
                      fill="url(#gradient-${node.id})"
                      initial={{ scale: 0 }}
                      animate={{ scale: isHovered || isSelected ? 1.2 : 1 }}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                    />

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        {node.type === 'lead' && (
                          <>
                            <stop offset="0%" stopColor="#778da9" />
                            <stop offset="100%" stopColor="#778da9" />
                          </>
                        )}
                        {node.type === 'influencer' && (
                          <>
                            <stop offset="0%" stopColor="#415a77" />
                            <stop offset="100%" stopColor="#8ea96c" />
                          </>
                        )}
                        {node.type === 'connection' && (
                          <>
                            <stop offset="0%" stopColor="#1b263b" />
                            <stop offset="100%" stopColor="#415a77" />
                          </>
                        )}
                      </linearGradient>
                    </defs>

                    {/* Node label */}
                    {(isHovered || isSelected) && (
                      <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        x={`${node.x}%`}
                        y={`${node.y - 8}%`}
                        textAnchor="middle"
                        className="text-xs font-medium fill-[#e0e1dd] pointer-events-none"
                      >
                        {node.name}
                      </motion.text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-[#415a77]/20">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#415a77] to-[#778da9]" />
                  <span className="text-[#e0e1dd]">Lead</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#415a77] to-[#8ea96c]" />
                  <span className="text-[#e0e1dd]">Influencer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1b263b] to-[#415a77]" />
                  <span className="text-[#e0e1dd]">Connection</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Community Clusters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
          >
            <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">Community Clusters</h3>
            <div className="space-y-3">
              {communities.map((community, index) => (
                <motion.div
                  key={community.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-[#0d1b2a] border border-[#415a77]/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: community.color }}
                    />
                    <span className="text-sm font-medium text-[#e0e1dd]">{community.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#778da9]">Members:</span>
                      <span className="ml-1 text-[#e0e1dd] font-medium">{community.members}</span>
                    </div>
                    <div>
                      <span className="text-[#778da9]">Influence:</span>
                      <span className="ml-1 text-[#e0e1dd] font-medium">
                        {community.avgInfluence}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selected Node Details */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-6 border border-[#415a77]/20"
            >
              <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">{selectedNode.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNodeColor(
                      selectedNode.type
                    )} flex items-center justify-center`}
                  >
                    {selectedNode.type === 'lead' && <Users className="w-6 h-6 text-white" />}
                    {selectedNode.type === 'influencer' && <Award className="w-6 h-6 text-white" />}
                    {selectedNode.type === 'connection' && <Network className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <div className="text-xs text-[#778da9] mb-1">Type</div>
                    <div className="text-sm font-medium text-[#e0e1dd] capitalize">
                      {selectedNode.type}
                    </div>
                  </div>
                </div>

                <div className="bg-[#1b263b] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#778da9]">Influence Score</span>
                    <span className="text-lg font-medium text-[#e0e1dd]">
                      {selectedNode.influence}
                    </span>
                  </div>
                  <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNode.influence}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${getNodeColor(selectedNode.type)}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#778da9]">Mutual Connections</span>
                    <span className="text-[#e0e1dd] font-medium">
                      {connections.filter((c) => c.from === selectedNode.id || c.to === selectedNode.id).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#778da9]">Engagement Rate</span>
                    <span className="text-[#e0e1dd] font-medium">
                      {Math.round(selectedNode.influence * 0.7)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Network Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]/20"
          >
            <h3 className="text-[18px] font-medium text-[#e0e1dd] mb-4">Network Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Connections', value: '247', icon: Users },
                { label: 'Avg Influence', value: '76', icon: TrendingUp },
                { label: 'Key Influencers', value: '12', icon: Award },
              ].map((stat, index) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-[#778da9]" />
                    <span className="text-sm text-[#778da9]">{stat.label}</span>
                  </div>
                  <span className="text-lg font-medium text-[#e0e1dd]">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
