// Code preview component with syntax highlighting
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodePreviewProps {
  code: string;
  language: string;
  title?: string;
}

export function CodePreview({ code, language, title }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl overflow-hidden backdrop-blur-sm"
    >
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full" />
          <span className="text-sm text-muted-foreground">
            {title || `${language} code`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Code */}
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}
