// Terminal-style window component
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

interface TerminalWindowProps {
  title: string;
  content: string;
  isTyping?: boolean;
}

export function TerminalWindow({ title, content, isTyping = false }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="w-4 h-4" />
          <span>{title}</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm">
        <div className="text-green-500 mb-2">$ codepilot analyze</div>
        <pre className="text-foreground whitespace-pre-wrap">
          {content}
          {isTyping && <span className="animate-pulse">_</span>}
        </pre>
      </div>
    </motion.div>
  );
}
