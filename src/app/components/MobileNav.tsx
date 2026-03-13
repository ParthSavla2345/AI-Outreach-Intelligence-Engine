import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Brain, BarChart3, Settings } from 'lucide-react';

const mobileNavItems = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads', icon: Users },
  { path: '/strategy', label: 'Strategy', icon: Brain },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1b263b] border-t border-[#415a77]/20 z-50"
      style={{ boxShadow: '0 -2px 16px rgba(65, 90, 119, 0.12)' }}
    >
      <div className="flex items-center justify-around px-4 py-3 safe-bottom">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all relative ${
                isActive ? 'text-[#e0e1dd]' : 'text-[#415a77]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#415a77]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
