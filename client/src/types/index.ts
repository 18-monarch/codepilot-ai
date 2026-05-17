// TypeScript interfaces for CodePilot AI Workspace

export interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  lastUpdated: string;
}

export interface TechStack {
  name: string;
  version: string;
  type: 'frontend' | 'backend' | 'database' | 'devops';
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

export interface AIActivity {
  id: string;
  type: 'analysis' | 'documentation' | 'debug' | 'test' | 'refactor';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
}

export interface StatsCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface CodeExample {
  language: string;
  code: string;
}

export interface DebugSuggestion {
  title: string;
  description: string;
  code?: string;
  severity: 'low' | 'medium' | 'high';
}
