import { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Brain,
  Radio,
  Clock,
  Network,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { MobileNav } from './MobileNav';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads', icon: Users },
  { path: '/strategy', label: 'Strategy Engine', icon: Brain },
  { path: '/channels', label: 'Channel Optimizer', icon: Radio },
  { path: '/timing', label: 'Timing Insights', icon: Clock },
  { path: '/graph', label: 'Graph Intelligence', icon: Network },
  { path: '/content', label: 'Content Generator', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0d1b2a] font-['Inter',sans-serif]">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-[#1b263b] border-r border-[#415a77]/25 flex flex-col relative hidden md:flex flex-shrink-0"
        style={{ boxShadow: '4px 0 24px rgba(13, 27, 42, 0.6)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[#415a77]/20">
          <motion.div
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <div className="text-[13px] font-semibold text-[#e0e1dd] tracking-wide">
                    Outreach AI
                  </div>
                  <div className="text-[10px] text-[#415a77] font-medium tracking-widest uppercase">
                    Intelligence
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                  ? 'bg-[#415a77] text-[#e0e1dd] shadow-md'
                  : 'text-[#778da9] hover:bg-[#415a77]/20 hover:text-[#e0e1dd]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#e0e1dd]' : 'text-[#778da9] group-hover:text-[#e0e1dd]'}`} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 w-0.5 h-5 bg-[#778da9] rounded-l-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-[#415a77]/20">
          <div className="flex items-center gap-3 px-2 py-2 hover:bg-[#415a77]/20 rounded-lg transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#415a77] to-[#778da9] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              JD
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <div className="text-[13px] font-medium text-[#e0e1dd]">John Doe</div>
                  <div className="text-[11px] text-[#415a77]">Sales Manager</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#415a77] border border-[#778da9]/30 text-[#e0e1dd] flex items-center justify-center shadow-lg hover:bg-[#778da9] transition-colors z-10"
        >
          {isCollapsed ? <Menu className="w-3 h-3" /> : <X className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 bg-[#0d1b2a]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* AI Assistant Bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-20 right-5 md:bottom-5 w-12 h-12 rounded-full bg-gradient-to-br from-[#415a77] to-[#778da9] shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-50"
        style={{ boxShadow: '0 4px 20px rgba(65, 90, 119, 0.5)' }}
      >
        <Sparkles className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  );
}