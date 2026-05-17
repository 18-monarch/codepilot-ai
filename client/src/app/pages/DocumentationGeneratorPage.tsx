// Documentation generator page
import { motion } from 'motion/react';
import { useState } from 'react';
import { GradientButton } from '../components/GradientButton';
import { CodePreview } from '../components/CodePreview';
import { FileText, Book, Code, Folder } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function DocumentationGeneratorPage() {
  const [generated, setGenerated] = useState(false);

  const sampleREADME = `# E-Commerce Platform

A modern, full-stack e-commerce solution built with React and TypeScript.

## Features

- 🛒 Shopping cart with real-time updates
- 💳 Secure payment processing
- 📦 Order tracking and management
- 👤 User authentication and profiles
- 🔍 Advanced product search and filtering

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Tech Stack

- React 18.2.0
- TypeScript 5.0.0
- Node.js 18.16.0
- PostgreSQL 15.2

## License

MIT`;

  const sampleAPI = `## API Documentation

### Authentication

#### POST /api/auth/login
Authenticate a user and return a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
\`\`\`

### Products

#### GET /api/products
Retrieve a list of products with optional filtering.

**Query Parameters:**
- \`category\`: Filter by category
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 20)`;

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Documentation Generator</h1>
        <p className="text-muted-foreground">
          Automatically generate comprehensive documentation for your codebase
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
        <div className="flex gap-3 items-center">
          <select className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground">
            <option>e-commerce-platform</option>
            <option>ml-pipeline</option>
            <option>mobile-app</option>
          </select>
          <GradientButton onClick={() => setGenerated(true)}>
            Generate Documentation
          </GradientButton>
        </div>
      </motion.div>

      {generated && (
        <>
          {/* Generation Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { icon: FileText, label: 'Files Documented', value: '156' },
              { icon: Code, label: 'Functions', value: '432' },
              { icon: Book, label: 'API Endpoints', value: '28' },
              { icon: Folder, label: 'Modules', value: '12' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-6"
              >
                <stat.icon className="w-8 h-8 text-purple-500 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Documentation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
          >
            <Tabs defaultValue="readme">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="readme">README</TabsTrigger>
                <TabsTrigger value="api">API Docs</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
              </TabsList>

              <TabsContent value="readme">
                <CodePreview
                  code={sampleREADME}
                  language="markdown"
                  title="README.md"
                />
              </TabsContent>

              <TabsContent value="api">
                <CodePreview
                  code={sampleAPI}
                  language="markdown"
                  title="API Documentation"
                />
              </TabsContent>

              <TabsContent value="functions">
                <div className="space-y-4">
                  <h3>Function Documentation</h3>
                  {[
                    {
                      name: 'authenticateUser',
                      desc: 'Validates user credentials and generates JWT token',
                      params: 'email: string, password: string',
                      returns: 'Promise<AuthToken>',
                    },
                    {
                      name: 'processPayment',
                      desc: 'Handles payment processing through Stripe API',
                      params: 'orderId: string, paymentMethod: PaymentMethod',
                      returns: 'Promise<PaymentResult>',
                    },
                    {
                      name: 'calculateTax',
                      desc: 'Calculates tax based on location and order total',
                      params: 'amount: number, zipCode: string',
                      returns: 'number',
                    },
                  ].map((func) => (
                    <div
                      key={func.name}
                      className="bg-muted/30 border border-border rounded-lg p-4"
                    >
                      <h4 className="font-mono mb-2">{func.name}()</h4>
                      <p className="text-sm text-muted-foreground mb-3">{func.desc}</p>
                      <div className="text-xs font-mono space-y-1">
                        <div>
                          <span className="text-muted-foreground">Parameters:</span>{' '}
                          <span className="text-purple-500">{func.params}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Returns:</span>{' '}
                          <span className="text-blue-500">{func.returns}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="architecture">
                <div className="space-y-4">
                  <h3>Architecture Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The application follows a modern three-tier architecture pattern with clear separation between presentation, business logic, and data layers. The frontend is built with React using a component-based architecture, while the backend implements RESTful API design principles.
                  </p>
                  <div className="bg-muted/30 border border-border rounded-lg p-6 font-mono text-sm">
                    <pre>{`┌─────────────────────────────────┐
│      React Frontend (SPA)       │
│  - Components                   │
│  - State Management             │
│  - Routing                      │
└─────────────────┬───────────────┘
                  │
                  │ REST API
                  │
┌─────────────────▼───────────────┐
│      Node.js Backend            │
│  - Express.js                   │
│  - Business Logic               │
│  - Authentication               │
└─────────────────┬───────────────┘
                  │
                  │ SQL Queries
                  │
┌─────────────────▼───────────────┐
│      PostgreSQL Database        │
│  - User Data                    │
│  - Product Catalog              │
│  - Orders                       │
└─────────────────────────────────┘`}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Download Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 justify-center"
          >
            <GradientButton variant="secondary">
              Download as Markdown
            </GradientButton>
            <GradientButton variant="secondary">
              Download as PDF
            </GradientButton>
            <GradientButton>
              Export to GitHub Wiki
            </GradientButton>
          </motion.div>
        </>
      )}
    </div>
  );
}
