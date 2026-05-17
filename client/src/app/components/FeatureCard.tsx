// Feature card component with glassmorphism effect
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  const IconComponent = (Icons[icon as keyof typeof Icons] || Icons.Box) as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-card border border-border rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
