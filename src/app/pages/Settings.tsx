import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Database, Bell, RefreshCw, Link as LinkIcon, Check } from 'lucide-react';

const integrations = [
  { name: 'Salesforce', status: 'connected', icon: '☁️' },
  { name: 'HubSpot', status: 'disconnected', icon: '🎯' },
  { name: 'LinkedIn Sales Navigator', status: 'connected', icon: '💼' },
  { name: 'Gmail', status: 'connected', icon: '📧' },
];

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    recommendations: true,
  });
  const [autoRetrain, setAutoRetrain] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-medium text-[#e0e1dd] mb-2">Settings</h1>
        <p className="text-[#778da9]" style={{ fontSize: '14px' }}>
          Manage your account and preferences
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* API Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">API Integrations</h2>
              <p className="text-sm text-[#778da9]">Connect your tools and platforms</p>
            </div>
          </div>

          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0d1b2a] border border-[#415a77]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <div className="font-medium text-[#e0e1dd] text-sm">{integration.name}</div>
                    <div
                      className={`text-xs ${
                        integration.status === 'connected' ? 'text-[#778da9]' : 'text-[#778da9]'
                      }`}
                    >
                      {integration.status === 'connected' ? 'Connected' : 'Not connected'}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    integration.status === 'connected'
                      ? 'bg-white border border-[#415a77]/30 text-[#778da9] hover:bg-[#0d1b2a]'
                      : 'bg-gradient-to-r from-[#415a77] to-[#778da9] text-white shadow-sm'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CRM Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">CRM Sync</h2>
              <p className="text-sm text-[#778da9]">Manage data synchronization</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0d1b2a]">
              <div>
                <div className="font-medium text-[#e0e1dd] text-sm mb-1">Auto-sync leads</div>
                <div className="text-xs text-[#778da9]">Automatically sync new leads from CRM</div>
              </div>
              <button className="relative w-14 h-8 bg-gradient-to-r from-[#415a77] to-[#778da9] rounded-full transition-colors">
                <div className="absolute right-1 top-1 w-6 h-6 bg-[#1b263b] rounded-full shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0d1b2a]">
              <div>
                <div className="font-medium text-[#e0e1dd] text-sm mb-1">Sync frequency</div>
                <div className="text-xs text-[#778da9]">How often to sync with CRM</div>
              </div>
              <select className="px-3 py-2 rounded-lg bg-[#1b263b] border border-[#415a77]/30 text-sm focus:outline-none focus:border-[#415a77]">
                <option>Every hour</option>
                <option>Every 6 hours</option>
                <option>Daily</option>
                <option>Manual</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0d1b2a]">
              <div>
                <div className="font-medium text-[#e0e1dd] text-sm mb-1">Last synced</div>
                <div className="text-xs text-[#778da9]">2 hours ago</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-[#1b263b] border border-[#415a77]/30 text-[#e0e1dd] hover:bg-[#0d1b2a] transition-colors text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Sync Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">Notifications</h2>
              <p className="text-sm text-[#778da9]">Manage notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email notifications', desc: 'Receive updates via email' },
              { key: 'push', label: 'Push notifications', desc: 'Browser push notifications' },
              { key: 'weekly', label: 'Weekly reports', desc: 'Get weekly performance summaries' },
              {
                key: 'recommendations',
                label: 'AI recommendations',
                desc: 'Daily AI-powered suggestions',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[#0d1b2a]">
                <div>
                  <div className="font-medium text-[#e0e1dd] text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-[#778da9]">{item.desc}</div>
                </div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })
                  }
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? 'bg-gradient-to-r from-[#415a77] to-[#778da9]'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-[#1b263b] rounded-full shadow-sm transition-all ${
                      notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Model Retraining */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#1b263b] to-[#1b263b]/30 rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[24px] font-medium text-[#e0e1dd]">AI Model Settings</h2>
              <p className="text-sm text-[#778da9]">Configure AI learning behavior</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white">
              <div>
                <div className="font-medium text-[#e0e1dd] text-sm mb-1">
                  Automatic model retraining
                </div>
                <div className="text-xs text-[#778da9]">
                  Allow AI to learn from new data automatically
                </div>
              </div>
              <button
                onClick={() => setAutoRetrain(!autoRetrain)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  autoRetrain ? 'bg-gradient-to-r from-[#415a77] to-[#778da9]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-[#1b263b] rounded-full shadow-sm transition-all ${
                    autoRetrain ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-[#e0e1dd] text-sm">Model Performance</div>
                <div className="text-[#778da9] text-sm">Excellent</div>
              </div>
              <div className="h-2 bg-[#1b263b] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#415a77] to-[#778da9]"
                />
              </div>
              <div className="mt-2 text-xs text-[#778da9]">Last trained: 2 days ago</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#415a77] to-[#778da9] text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Trigger Manual Retraining
            </motion.button>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1b263b] rounded-2xl p-8 border border-[#415a77]/20"
          style={{ boxShadow: '0 4px 16px rgba(65, 90, 119, 0.15)' }}
        >
          <h2 className="text-[24px] font-medium text-[#e0e1dd] mb-6">Appearance</h2>
          <div className="space-y-3">
            {['light', 'warm'].map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                  theme === themeOption
                    ? 'border-[#415a77] bg-[#415a77]/5'
                    : 'border-[#415a77]/20 hover:border-[#415a77]'
                }`}
              >
                <div>
                  <div className="font-medium text-[#e0e1dd] text-sm capitalize">{themeOption}</div>
                  <div className="text-xs text-[#778da9]">
                    {themeOption === 'light' ? 'Clean and minimal' : 'Soft warm tones'}
                  </div>
                </div>
                {theme === themeOption && (
                  <div className="w-6 h-6 rounded-full bg-[#415a77] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
