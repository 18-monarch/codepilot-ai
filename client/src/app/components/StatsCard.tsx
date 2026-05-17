// Stats card component for dashboard metrics
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export function StatsCard({ label, value, change, trend, icon }: StatsCardProps) {
  const IconComponent = (Icons[icon as keyof typeof Icons] || Icons.Activity) as LucideIcon;
  const TrendIcon = trend === 'up' ? Icons.TrendingUp : Icons.TrendingDown;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-3 rounded-lg">
          <IconComponent className="w-6 h-6 text-purple-500" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}
