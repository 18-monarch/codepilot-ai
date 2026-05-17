// AI response card with loading animation
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AIResponseCardProps {
  title: string;
  content: string;
  isLoading?: boolean;
}

export function AIResponseCard({ title, content, isLoading = false }: AIResponseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3>{title}</h3>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      ) : (
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      )}
    </motion.div>
  );
}
