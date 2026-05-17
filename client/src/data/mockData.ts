// Mock data for CodePilot AI Workspace
import type { Repository, AIActivity, StatsCard, Feature, Testimonial, TechStack, FileNode } from '../types';

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'e-commerce-platform',
    url: 'https://github.com/example/e-commerce-platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    language: 'TypeScript',
    stars: 1234,
    lastUpdated: '2026-05-14',
  },
  {
    id: '2',
    name: 'ml-pipeline',
    url: 'https://github.com/example/ml-pipeline',
    description: 'Machine learning data pipeline and model training',
    language: 'Python',
    stars: 567,
    lastUpdated: '2026-05-12',
  },
  {
    id: '3',
    name: 'mobile-app',
    url: 'https://github.com/example/mobile-app',
    description: 'Cross-platform mobile application',
    language: 'React Native',
    stars: 890,
    lastUpdated: '2026-05-10',
  },
];

export const mockActivities: AIActivity[] = [
  {
    id: '1',
    type: 'analysis',
    title: 'Repository Analysis Complete',
    description: 'Analyzed e-commerce-platform repository structure',
    timestamp: '2 minutes ago',
    status: 'completed',
  },
  {
    id: '2',
    type: 'documentation',
    title: 'Documentation Generated',
    description: 'Created comprehensive API documentation',
    timestamp: '15 minutes ago',
    status: 'completed',
  },
  {
    id: '3',
    type: 'test',
    title: 'Unit Tests Generated',
    description: 'Generated 24 unit tests for authentication module',
    timestamp: '1 hour ago',
    status: 'completed',
  },
  {
    id: '4',
    type: 'debug',
    title: 'Debugging Session',
    description: 'Analyzing TypeError in checkout flow',
    timestamp: '2 hours ago',
    status: 'in-progress',
  },
];

export const mockStats: StatsCard[] = [
  {
    label: 'Repositories Analyzed',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: 'FolderGit2',
  },
  {
    label: 'Documentation Generated',
    value: '156',
    change: '+23%',
    trend: 'up',
    icon: 'FileText',
  },
  {
    label: 'Bugs Fixed',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: 'Bug',
  },
  {
    label: 'Time Saved',
    value: '124h',
    change: '+15%',
    trend: 'up',
    icon: 'Clock',
  },
];

export const features: Feature[] = [
  {
    title: 'Repository Analysis',
    description: 'Understand any codebase instantly with AI-powered architecture analysis and dependency mapping.',
    icon: 'FolderGit2',
  },
  {
    title: 'Smart Documentation',
    description: 'Generate comprehensive documentation, API specs, and code explanations automatically.',
    icon: 'FileText',
  },
  {
    title: 'Intelligent Debugging',
    description: 'Get instant error explanations, root cause analysis, and fix suggestions.',
    icon: 'Bug',
  },
  {
    title: 'Test Generation',
    description: 'Automatically create unit tests, integration tests, and edge case scenarios.',
    icon: 'TestTube',
  },
  {
    title: 'Code Refactoring',
    description: 'Improve code quality with AI-driven refactoring suggestions and best practices.',
    icon: 'Sparkles',
  },
  {
    title: 'Team Onboarding',
    description: 'Accelerate new developer onboarding with personalized learning paths.',
    icon: 'Users',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    company: 'TechCorp',
    content: 'CodePilot cut our onboarding time from 2 weeks to 3 days. The AI-generated documentation is incredibly accurate.',
    avatar: '👩‍💻',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Tech Lead',
    company: 'StartupXYZ',
    content: 'The debug assistant saved us countless hours. It identified edge cases we never thought of.',
    avatar: '👨‍💻',
  },
  {
    name: 'Emily Watson',
    role: 'CTO',
    company: 'InnovateLabs',
    content: 'CodePilot has become essential to our development workflow. The ROI is remarkable.',
    avatar: '👩‍💼',
  },
];

export const mockTechStack: TechStack[] = [
  { name: 'React', version: '18.2.0', type: 'frontend' },
  { name: 'TypeScript', version: '5.0.0', type: 'frontend' },
  { name: 'Node.js', version: '18.16.0', type: 'backend' },
  { name: 'Express', version: '4.18.2', type: 'backend' },
  { name: 'PostgreSQL', version: '15.2', type: 'database' },
  { name: 'Redis', version: '7.0.0', type: 'database' },
  { name: 'Docker', version: '23.0.0', type: 'devops' },
  { name: 'AWS', version: 'latest', type: 'devops' },
];

export const mockFileTree: FileNode = {
  name: 'e-commerce-platform',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          name: 'components',
          type: 'folder',
          path: '/src/components',
          children: [
            { name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx' },
            { name: 'ProductCard.tsx', type: 'file', path: '/src/components/ProductCard.tsx' },
          ],
        },
        {
          name: 'pages',
          type: 'folder',
          path: '/src/pages',
          children: [
            { name: 'Home.tsx', type: 'file', path: '/src/pages/Home.tsx' },
            { name: 'Checkout.tsx', type: 'file', path: '/src/pages/Checkout.tsx' },
          ],
        },
        { name: 'App.tsx', type: 'file', path: '/src/App.tsx' },
      ],
    },
    { name: 'package.json', type: 'file', path: '/package.json' },
    { name: 'README.md', type: 'file', path: '/README.md' },
  ],
};

export const chartData = [
  { name: 'Mon', analyses: 12, docs: 8, tests: 15 },
  { name: 'Tue', analyses: 19, docs: 12, tests: 22 },
  { name: 'Wed', analyses: 15, docs: 10, tests: 18 },
  { name: 'Thu', analyses: 22, docs: 15, tests: 25 },
  { name: 'Fri', analyses: 28, docs: 20, tests: 30 },
  { name: 'Sat', analyses: 10, docs: 6, tests: 12 },
  { name: 'Sun', analyses: 8, docs: 5, tests: 10 },
];
