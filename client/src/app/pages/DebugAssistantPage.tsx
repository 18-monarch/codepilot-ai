// Debug assistant page
import { motion } from 'motion/react';
import { useState } from 'react';
import { GradientButton } from '../components/GradientButton';
import { AIResponseCard } from '../components/AIResponseCard';
import { CodePreview } from '../components/CodePreview';
import { Bug, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';

export function DebugAssistantPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const errorCode = `function checkout(cart) {
  const total = cart.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.discount) {
    total = total - (total * cart.discount);
  }

  return processPayment(total);
}`;

  const fixedCode = `function checkout(cart) {
  let total = cart.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.discount) {
    total = total - (total * cart.discount);
  }

  return processPayment(total);
}`;

  const stackTrace = `TypeError: Assignment to constant variable.
    at checkout (cart.js:7:5)
    at processOrder (order.js:23:12)
    at handleSubmit (Checkout.tsx:45:8)`;

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Debug Assistant</h1>
        <p className="text-muted-foreground">
          Get instant error explanations and intelligent fix suggestions
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm space-y-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Bug className="w-6 h-6 text-purple-500" />
            <h2>Error Details</h2>
          </div>
          <Textarea
            placeholder="Paste your error message or stack trace here..."
            className="min-h-32 font-mono text-sm"
            defaultValue={stackTrace}
          />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Bug className="w-6 h-6 text-purple-500" />
            <h2>Problematic Code</h2>
          </div>
          <Textarea
            placeholder="Paste the code that's causing the error..."
            className="min-h-48 font-mono text-sm"
            defaultValue={errorCode}
          />
        </div>

        <GradientButton onClick={handleAnalyze} className="w-full">
          {analyzing ? 'Analyzing Error...' : 'Explain Error'}
        </GradientButton>
      </motion.div>

      {analyzed && (
        <>
          {/* Error Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AIResponseCard
              title="Error Analysis"
              content="The error occurs because you're trying to reassign a value to 'total', which was declared as a const. In JavaScript, const variables cannot be reassigned after their initial declaration. On line 7, you're attempting to modify 'total', which violates the const constraint. The solution is to change 'const' to 'let' when declaring the 'total' variable, as you need to modify it later in the function."
            />
          </motion.div>

          {/* Severity & Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="mb-2">Severity</h3>
              <p className="text-2xl font-bold text-red-500">High</p>
              <p className="text-sm text-muted-foreground mt-2">Blocks checkout process</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Bug className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="mb-2">Error Type</h3>
              <p className="text-2xl font-bold">TypeError</p>
              <p className="text-sm text-muted-foreground mt-2">Assignment error</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="mb-2">Fix Complexity</h3>
              <p className="text-2xl font-bold text-green-500">Easy</p>
              <p className="text-sm text-muted-foreground mt-2">Single line change</p>
            </div>
          </motion.div>

          {/* Suggested Fixes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-purple-500" />
              <h2>Suggested Fixes</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Fix #1: Change const to let (Recommended)
                </h3>
                <CodePreview
                  code={fixedCode}
                  language="javascript"
                  title="cart.js (fixed)"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  This is the simplest fix. Change 'const total' to 'let total' on line 2 to allow reassignment.
                </p>
              </div>

              <div>
                <h3 className="mb-3">Alternative Fix #2: Use a new variable</h3>
                <CodePreview
                  code={`function checkout(cart) {
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const total = cart.discount
    ? subtotal - (subtotal * cart.discount)
    : subtotal;

  return processPayment(total);
}`}
                  language="javascript"
                  title="cart.js (alternative)"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  This approach maintains immutability by using a separate variable for the discounted total.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-4">Related Recommendations</h2>
            <div className="space-y-3">
              {[
                'Add input validation for cart.discount to ensure it\'s between 0 and 1',
                'Consider handling empty cart.items array to avoid returning 0',
                'Add error handling for processPayment() failures',
                'Implement TypeScript for better type safety',
              ].map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <Lightbulb className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
