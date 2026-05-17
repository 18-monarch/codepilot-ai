// AI onboarding assistant page
import { motion } from 'motion/react';
import { useState } from 'react';
import { GradientButton } from '../components/GradientButton';
import { GraduationCap, Folder, FileCode, Users, Settings, CheckCircle } from 'lucide-react';

export function AIOnboardingPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">AI Onboarding Assistant</h1>
        <p className="text-muted-foreground">
          Generate personalized onboarding guides for new team members
        </p>
      </motion.div>

      {/* Repository Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <Folder className="w-6 h-6 text-purple-500" />
          <h2>Select Repository</h2>
        </div>
        <div className="flex gap-3">
          <select className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground">
            <option>e-commerce-platform</option>
            <option>ml-pipeline</option>
            <option>mobile-app</option>
          </select>
          <GradientButton onClick={() => setGenerated(true)}>
            Generate Onboarding Guide
          </GradientButton>
        </div>
      </motion.div>

      {generated && (
        <>
          {/* Onboarding Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Settings, label: 'Setup Steps', value: '8', color: 'purple' },
              { icon: FileCode, label: 'Key Files', value: '15', color: 'blue' },
              { icon: Users, label: 'Team Contacts', value: '6', color: 'green' },
              { icon: GraduationCap, label: 'Learning Modules', value: '4', color: 'orange' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-6"
              >
                <stat.icon className={`w-8 h-8 text-${stat.color}-500 mb-3`} />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-8">Onboarding Timeline</h2>

            <div className="space-y-8">
              {[
                {
                  day: 'Day 1',
                  title: 'Environment Setup',
                  tasks: [
                    'Install Node.js 18.16.0',
                    'Clone repository from GitHub',
                    'Install dependencies with npm install',
                    'Configure environment variables (.env)',
                    'Run development server',
                  ],
                },
                {
                  day: 'Day 2-3',
                  title: 'Architecture Deep Dive',
                  tasks: [
                    'Review project structure and folder organization',
                    'Understand React component architecture',
                    'Learn state management patterns',
                    'Study API integration approach',
                    'Review authentication flow',
                  ],
                },
                {
                  day: 'Day 4-5',
                  title: 'Key Features Exploration',
                  tasks: [
                    'Walk through checkout flow implementation',
                    'Understand payment processing integration',
                    'Review product catalog system',
                    'Study user management features',
                    'Explore admin dashboard',
                  ],
                },
                {
                  day: 'Week 2',
                  title: 'First Contribution',
                  tasks: [
                    'Pick a good first issue from backlog',
                    'Set up feature branch',
                    'Implement small feature or bug fix',
                    'Write tests for your changes',
                    'Submit pull request for review',
                  ],
                },
              ].map((phase, index) => (
                <div key={phase.day} className="relative">
                  {/* Timeline connector */}
                  {index < 3 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />
                  )}

                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-muted/30 border border-border rounded-lg p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3>{phase.title}</h3>
                          <span className="text-sm text-muted-foreground">{phase.day}</span>
                        </div>
                        <ul className="space-y-2">
                          {phase.tasks.map((task) => (
                            <li key={task} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="mb-6">Important Files to Understand</h2>
            <div className="space-y-3">
              {[
                {
                  file: 'src/App.tsx',
                  desc: 'Main application component and routing setup',
                  priority: 'high',
                },
                {
                  file: 'src/pages/Checkout.tsx',
                  desc: 'Checkout flow - critical business logic',
                  priority: 'high',
                },
                {
                  file: 'src/utils/api.ts',
                  desc: 'API client configuration and helpers',
                  priority: 'high',
                },
                {
                  file: 'src/components/ProductCard.tsx',
                  desc: 'Reusable product display component',
                  priority: 'medium',
                },
                {
                  file: '.env.example',
                  desc: 'Environment variables configuration template',
                  priority: 'medium',
                },
              ].map((item) => (
                <div
                  key={item.file}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border hover:border-purple-500/30 transition-colors"
                >
                  <FileCode className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-mono mb-1">{item.file}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      item.priority === 'high'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team & Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Team Contacts */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-purple-500" />
                <h2>Team Contacts</h2>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', role: 'Tech Lead', contact: '@sarah' },
                  { name: 'Mike Rodriguez', role: 'Backend Engineer', contact: '@mike' },
                  { name: 'Emily Watson', role: 'Frontend Lead', contact: '@emily' },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                      {person.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm">{person.name}</h4>
                      <p className="text-xs text-muted-foreground">{person.role}</p>
                    </div>
                    <span className="text-xs text-purple-500">{person.contact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-6">Common Setup Issues</h2>
              <div className="space-y-3">
                {[
                  'Node version mismatch - use nvm to install v18.16.0',
                  'Missing .env file - copy from .env.example',
                  'Port 3000 already in use - kill existing process',
                  'Database connection fails - check credentials',
                ].map((issue) => (
                  <div
                    key={issue}
                    className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{issue}</p>
                  </div>
                ))}
              </div>
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
              Download as PDF
            </GradientButton>
            <GradientButton variant="secondary">
              Export to Notion
            </GradientButton>
            <GradientButton>
              Share with Team
            </GradientButton>
          </motion.div>
        </>
      )}
    </div>
  );
}
