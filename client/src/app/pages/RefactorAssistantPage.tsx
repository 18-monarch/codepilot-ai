// Refactor assistant page
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function RefactorAssistantPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Refactor Assistant</h1>
        <p className="text-muted-foreground">
          AI-powered code refactoring suggestions (Coming Soon)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-12 text-center"
      >
        <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          This feature is under development and will be available soon.
        </p>
      </motion.div>
    </div>
  );
}
