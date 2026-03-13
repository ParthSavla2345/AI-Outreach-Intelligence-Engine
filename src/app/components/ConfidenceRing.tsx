import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ConfidenceRingProps {
  value: number;
}

export function ConfidenceRing({ value }: ConfidenceRingProps) {
  const [percentage, setPercentage] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setPercentage(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-28 h-28">
      <svg className="transform -rotate-90 w-28 h-28">
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="#1b263b"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          strokeDasharray={circumference}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#415a77" />
            <stop offset="100%" stopColor="#778da9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-[24px] font-medium text-[#e0e1dd]">{value}%</div>
        <div className="text-[10px] text-[#778da9]">Confidence</div>
      </div>
    </div>
  );
}
