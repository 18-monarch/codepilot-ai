// Repository analyzer page
import { motion } from 'motion/react';
import { useState } from 'react';
import { GradientButton } from '../components/GradientButton';
import { AIResponseCard } from '../components/AIResponseCard';
import { TerminalWindow } from '../components/TerminalWindow';
import { Search, Folder, FileCode, Package } from 'lucide-react';
import { mockTechStack, mockFileTree } from '../../data/mockData';
import { Input } from '../components/ui/input';

export function RepositoryAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Repository Analyzer</h1>
        <p className="text-muted-foreground">
          Understand any codebase instantly with AI-powered analysis
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-purple-500" />
          <h2>Repository URL</h2>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="https://github.com/username/repository"
            className="flex-1"
            defaultValue="https://github.com/example/e-commerce-platform"
          />
          <GradientButton onClick={handleAnalyze}>
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </GradientButton>
        </div>
      </motion.div>

      {analyzed && (
        <>
          {/* Repository Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <FileCode className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="mb-2">Files Analyzed</h3>
              <p className="text-3xl font-bold">247</p>
              <p className="text-sm text-muted-foreground mt-2">Across 12 directories</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Package className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="mb-2">Dependencies</h3>
              <p className="text-3xl font-bold">32</p>
              <p className="text-sm text-muted-foreground mt-2">NPM packages detected</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Folder className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="mb-2">Lines of Code</h3>
              <p className="text-3xl font-bold">15.2k</p>
              <p className="text-sm text-muted-foreground mt-2">Total LOC</p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTechStack.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-muted/30 border border-border rounded-lg p-4 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{tech.name}</h4>
                    <span className={`w-2 h-2 rounded-full ${
                      tech.type === 'frontend' ? 'bg-purple-500' :
                      tech.type === 'backend' ? 'bg-blue-500' :
                      tech.type === 'database' ? 'bg-green-500' :
                      'bg-orange-500'
                    }`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{tech.version}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-1">{tech.type}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Folder Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-6">Folder Structure</h2>
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-purple-500" />
                <span>e-commerce-platform/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-purple-500" />
                  <span>src/</span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-purple-500" />
                    <span>components/</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-purple-500" />
                    <span>pages/</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-muted-foreground" />
                    <span>App.tsx</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-muted-foreground" />
                  <span>package.json</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-muted-foreground" />
                  <span>README.md</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AIResponseCard
              title="Architecture Analysis"
              content="This is a modern full-stack e-commerce application built with React and TypeScript. The architecture follows a component-based design pattern with clear separation of concerns. The application uses a monolithic frontend structure with React Router for navigation. The codebase demonstrates good practices including TypeScript for type safety, modular component design, and separation of business logic from presentation."
            />
          </motion.div>

          {/* Important Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-6">Important Files</h2>
            <div className="space-y-3">
              {[
                { name: 'src/App.tsx', desc: 'Main application entry point' },
                { name: 'src/pages/Checkout.tsx', desc: 'Checkout flow and payment processing' },
                { name: 'package.json', desc: 'Project dependencies and scripts' },
                { name: 'src/components/ProductCard.tsx', desc: 'Reusable product display component' },
              ].map((file) => (
                <div
                  key={file.name}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <FileCode className="w-5 h-5 text-purple-500 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-sm font-mono">{file.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{file.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
