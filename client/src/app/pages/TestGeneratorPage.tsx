// Test generator page
import { motion } from 'motion/react';
import { useState } from 'react';
import { GradientButton } from '../components/GradientButton';
import { CodePreview } from '../components/CodePreview';
import { TestTube, CheckCircle, AlertTriangle } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';

export function TestGeneratorPage() {
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const inputCode = `function calculateDiscount(price, discountPercent) {
  if (price <= 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input');
  }
  return price - (price * discountPercent / 100);
}`;

  const generatedTests = `import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './discount';

describe('calculateDiscount', () => {
  it('should calculate correct discount for valid inputs', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(50, 20)).toBe(40);
    expect(calculateDiscount(200, 50)).toBe(100);
  });

  it('should handle 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  it('should handle 100% discount', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  it('should handle decimal prices', () => {
    expect(calculateDiscount(99.99, 10)).toBeCloseTo(89.99, 2);
  });

  it('should throw error for negative price', () => {
    expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input');
  });

  it('should throw error for negative discount', () => {
    expect(() => calculateDiscount(100, -10)).toThrow('Invalid input');
  });

  it('should throw error for discount over 100', () => {
    expect(() => calculateDiscount(100, 150)).toThrow('Invalid input');
  });

  it('should throw error for zero price', () => {
    expect(() => calculateDiscount(0, 10)).toThrow('Invalid input');
  });
});`;

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Test Generator</h1>
        <p className="text-muted-foreground">
          Automatically generate comprehensive unit tests for your functions
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
            <TestTube className="w-6 h-6 text-purple-500" />
            <h2>Function to Test</h2>
          </div>
          <Textarea
            placeholder="Paste your function code here..."
            className="min-h-48 font-mono text-sm"
            defaultValue={inputCode}
          />
        </div>

        <div>
          <label className="mb-3 block">Test Framework</label>
          <select className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground">
            <option>Vitest</option>
            <option>Jest</option>
            <option>Mocha</option>
            <option>Jasmine</option>
          </select>
        </div>

        <GradientButton onClick={handleGenerate} className="w-full">
          {generating ? 'Generating Tests...' : 'Generate Tests'}
        </GradientButton>
      </motion.div>

      {generated && (
        <>
          {/* Test Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <TestTube className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="mb-2">Tests Generated</h3>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-muted-foreground mt-2">Unit tests created</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="mb-2">Coverage</h3>
              <p className="text-3xl font-bold text-green-500">100%</p>
              <p className="text-sm text-muted-foreground mt-2">Code coverage</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="mb-2">Edge Cases</h3>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground mt-2">Scenarios covered</p>
            </div>
          </motion.div>

          {/* Generated Tests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CodePreview
              code={generatedTests}
              language="typescript"
              title="discount.test.ts"
            />
          </motion.div>

          {/* Edge Cases Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-6">Edge Cases Covered</h2>
            <div className="space-y-3">
              {[
                {
                  case: 'Negative price input',
                  desc: 'Ensures function rejects invalid negative prices',
                  severity: 'high',
                },
                {
                  case: 'Discount percentage over 100',
                  desc: 'Validates discount percentage bounds',
                  severity: 'high',
                },
                {
                  case: 'Zero price input',
                  desc: 'Handles edge case of zero-value items',
                  severity: 'medium',
                },
                {
                  case: 'Decimal price values',
                  desc: 'Tests floating-point arithmetic accuracy',
                  severity: 'medium',
                },
                {
                  case: 'Maximum discount (100%)',
                  desc: 'Ensures correct calculation at boundary',
                  severity: 'low',
                },
              ].map((edge) => (
                <div
                  key={edge.case}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      edge.severity === 'high'
                        ? 'bg-red-500'
                        : edge.severity === 'medium'
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{edge.case}</h4>
                    <p className="text-sm text-muted-foreground">{edge.desc}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      edge.severity === 'high'
                        ? 'bg-red-500/20 text-red-500'
                        : edge.severity === 'medium'
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}
                  >
                    {edge.severity}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Test Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30 rounded-xl p-6"
          >
            <h3 className="mb-4">Test Best Practices Applied</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '✓ Descriptive test names',
                '✓ Arrange-Act-Assert pattern',
                '✓ Independent test cases',
                '✓ Boundary value testing',
                '✓ Error handling validation',
                '✓ Floating-point precision',
              ].map((practice) => (
                <div key={practice} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{practice}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 justify-center"
          >
            <GradientButton variant="secondary">
              Download Tests
            </GradientButton>
            <GradientButton>
              Add to Project
            </GradientButton>
          </motion.div>
        </>
      )}
    </div>
  );
}
