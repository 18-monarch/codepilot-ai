import { PrismaClient, UserRole, UserStatus, ActivityType, RepositoryStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.onboardingGuide.deleteMany();
  await prisma.refactoring.deleteMany();
  await prisma.debugSession.deleteMany();
  await prisma.testSuite.deleteMany();
  await prisma.documentation.deleteMany();
  await prisma.aIAnalysis.deleteMany();
  await prisma.techStack.deleteMany();
  await prisma.repository.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  // Create Teams
  console.log('👥 Creating teams...');
  const engineeringTeam = await prisma.team.create({
    data: {
      name: 'Engineering Team',
      description: 'Core product development team',
    },
  });

  const dataTeam = await prisma.team.create({
    data: {
      name: 'Data Science Team',
      description: 'AI and ML research team',
    },
  });

  // Create Users
  console.log('👤 Creating users...');
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@codepilot.ai',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      bio: 'Platform administrator with full system access',
      githubUsername: 'admin-codepilot',
      teamId: engineeringTeam.id,
    },
  });

  const teamLead = await prisma.user.create({
    data: {
      email: 'lead@codepilot.ai',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Chen',
      role: UserRole.TEAM_LEAD,
      status: UserStatus.ACTIVE,
      bio: 'Senior Engineering Lead specializing in full-stack development',
      githubUsername: 'sarah-chen',
      teamId: engineeringTeam.id,
    },
  });

  const developer1 = await prisma.user.create({
    data: {
      email: 'john@codepilot.ai',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.DEVELOPER,
      status: UserStatus.ACTIVE,
      bio: 'Full-stack developer passionate about AI and automation',
      githubUsername: 'john-doe-dev',
      teamId: engineeringTeam.id,
    },
  });

  const developer2 = await prisma.user.create({
    data: {
      email: 'emily@codepilot.ai',
      password: hashedPassword,
      firstName: 'Emily',
      lastName: 'Watson',
      role: UserRole.DEVELOPER,
      status: UserStatus.ACTIVE,
      bio: 'Frontend specialist with expertise in React and TypeScript',
      githubUsername: 'emily-watson',
      teamId: engineeringTeam.id,
    },
  });

  const developer3 = await prisma.user.create({
    data: {
      email: 'michael@codepilot.ai',
      password: hashedPassword,
      firstName: 'Michael',
      lastName: 'Rodriguez',
      role: UserRole.DEVELOPER,
      status: UserStatus.ACTIVE,
      bio: 'Backend engineer focused on scalable architectures',
      githubUsername: 'michael-rodriguez',
      teamId: dataTeam.id,
    },
  });

  console.log('✅ Created 5 users (admin, team lead, 3 developers)');
  console.log('📧 All users have password: Password123!');

  // Create Repositories
  console.log('📦 Creating repositories...');
  const repo1 = await prisma.repository.create({
    data: {
      name: 'e-commerce-platform',
      url: 'https://github.com/example/e-commerce-platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      language: 'TypeScript',
      stars: 1234,
      forks: 156,
      openIssues: 23,
      size: 15234,
      defaultBranch: 'main',
      isPrivate: false,
      status: RepositoryStatus.ANALYZED,
      filesCount: 247,
      linesOfCode: 15234,
      dependenciesCount: 32,
      lastAnalyzedAt: new Date(),
      userId: developer1.id,
      owner: 'example',
      fullName: 'example/e-commerce-platform',
    },
  });

  const repo2 = await prisma.repository.create({
    data: {
      name: 'ml-pipeline',
      url: 'https://github.com/example/ml-pipeline',
      description: 'Machine learning data pipeline and model training',
      language: 'Python',
      stars: 567,
      forks: 89,
      openIssues: 12,
      size: 8945,
      defaultBranch: 'main',
      isPrivate: false,
      status: RepositoryStatus.ANALYZED,
      filesCount: 156,
      linesOfCode: 8945,
      dependenciesCount: 24,
      lastAnalyzedAt: new Date(),
      userId: developer3.id,
      owner: 'example',
      fullName: 'example/ml-pipeline',
    },
  });

  const repo3 = await prisma.repository.create({
    data: {
      name: 'mobile-app',
      url: 'https://github.com/example/mobile-app',
      description: 'Cross-platform mobile application with React Native',
      language: 'JavaScript',
      stars: 890,
      forks: 123,
      openIssues: 18,
      size: 12456,
      defaultBranch: 'main',
      isPrivate: false,
      status: RepositoryStatus.ANALYZED,
      filesCount: 198,
      linesOfCode: 12456,
      dependenciesCount: 28,
      lastAnalyzedAt: new Date(),
      userId: developer2.id,
      owner: 'example',
      fullName: 'example/mobile-app',
    },
  });

  // Create Tech Stack
  console.log('🔧 Creating tech stacks...');
  await prisma.techStack.createMany({
    data: [
      { name: 'React', version: '18.2.0', type: 'frontend', repositoryId: repo1.id },
      { name: 'TypeScript', version: '5.0.0', type: 'frontend', repositoryId: repo1.id },
      { name: 'Node.js', version: '18.16.0', type: 'backend', repositoryId: repo1.id },
      { name: 'Express', version: '4.18.2', type: 'backend', repositoryId: repo1.id },
      { name: 'PostgreSQL', version: '15.2', type: 'database', repositoryId: repo1.id },
      { name: 'Docker', version: '23.0.0', type: 'devops', repositoryId: repo1.id },
      
      { name: 'Python', version: '3.11', type: 'backend', repositoryId: repo2.id },
      { name: 'TensorFlow', version: '2.12', type: 'backend', repositoryId: repo2.id },
      { name: 'Pandas', version: '2.0', type: 'backend', repositoryId: repo2.id },
      { name: 'PostgreSQL', version: '15.2', type: 'database', repositoryId: repo2.id },
      
      { name: 'React Native', version: '0.72', type: 'frontend', repositoryId: repo3.id },
      { name: 'TypeScript', version: '5.0.0', type: 'frontend', repositoryId: repo3.id },
      { name: 'Expo', version: '49.0', type: 'frontend', repositoryId: repo3.id },
    ],
  });

  // Create AI Analyses
  console.log('🤖 Creating AI analyses...');
  await prisma.aIAnalysis.create({
    data: {
      type: 'REPOSITORY',
      status: 'COMPLETED',
      summary: 'Well-structured e-commerce platform with modern tech stack',
      insights: {
        codeQuality: 'High',
        maintainability: 'Good',
        testCoverage: '78%',
        securityScore: 'A',
      },
      recommendations: {
        improvements: [
          'Add more integration tests',
          'Implement rate limiting on API endpoints',
          'Add error boundary components',
        ],
      },
      metrics: {
        complexity: 'Medium',
        duplication: '5%',
        documentation: '85%',
      },
      processingTime: 2345,
      tokensUsed: 1234,
      completedAt: new Date(),
      userId: developer1.id,
      repositoryId: repo1.id,
    },
  });

  // Create Documentation
  console.log('📝 Creating documentation...');
  await prisma.documentation.create({
    data: {
      title: 'E-Commerce Platform README',
      type: 'README',
      content: `# E-Commerce Platform

A modern, full-stack e-commerce solution built with React, Node.js, and PostgreSQL.

## Features

- User authentication and authorization
- Product catalog with search and filters
- Shopping cart and checkout
- Payment integration
- Order management
- Admin dashboard

## Tech Stack

- Frontend: React 18, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL
- Deployment: Docker, AWS

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## License

MIT`,
      format: 'markdown',
      wordCount: 85,
      readingTime: 1,
      userId: developer1.id,
      repositoryId: repo1.id,
    },
  });

  // Create Test Suites
  console.log('🧪 Creating test suites...');
  await prisma.testSuite.create({
    data: {
      name: 'Authentication Tests',
      framework: 'JEST',
      language: 'TypeScript',
      sourceCode: `function login(email: string, password: string) {
  if (!email || !password) throw new Error('Invalid credentials');
  return { token: 'jwt-token', user: { email } };
}`,
      testCode: `describe('login', () => {
  it('should return token for valid credentials', () => {
    const result = login('test@example.com', 'password');
    expect(result.token).toBeDefined();
  });
  
  it('should throw error for invalid credentials', () => {
    expect(() => login('', '')).toThrow('Invalid credentials');
  });
});`,
      testsCount: 2,
      coverage: 95.5,
      userId: developer1.id,
      repositoryId: repo1.id,
    },
  });

  // Create Debug Sessions
  console.log('🐛 Creating debug sessions...');
  await prisma.debugSession.create({
    data: {
      title: 'TypeError in Checkout Flow',
      errorMessage: "Cannot read property 'price' of undefined",
      stackTrace: `TypeError: Cannot read property 'price' of undefined
    at calculateTotal (checkout.ts:45:23)
    at processOrder (order.ts:89:15)`,
      errorType: 'TypeError',
      rootCause: 'Missing null check for product object before accessing price property',
      suggestions: {
        fixes: [
          'Add null/undefined check before accessing product.price',
          'Use optional chaining: product?.price',
          'Validate product data at API boundary',
        ],
      },
      fixedCode: `function calculateTotal(items) {
  return items.reduce((total, item) => {
    const price = item.product?.price ?? 0;
    return total + (price * item.quantity);
  }, 0);
}`,
      severity: 'HIGH',
      language: 'TypeScript',
      framework: 'React',
      resolved: true,
      resolvedAt: new Date(),
      userId: developer1.id,
    },
  });

  // Create Activity Logs
  console.log('📊 Creating activity logs...');
  const activities = [
    { userId: developer1.id, type: 'REPOSITORY_ANALYZED', title: 'Repository Analyzed', description: 'Analyzed e-commerce-platform repository' },
    { userId: developer1.id, type: 'DOCUMENTATION_GENERATED', title: 'Documentation Generated', description: 'Created README for e-commerce-platform' },
    { userId: developer1.id, type: 'TEST_GENERATED', title: 'Tests Generated', description: 'Generated 24 unit tests for authentication module' },
    { userId: developer2.id, type: 'REPOSITORY_ANALYZED', title: 'Repository Analyzed', description: 'Analyzed mobile-app repository' },
    { userId: developer3.id, type: 'REPOSITORY_ANALYZED', title: 'Repository Analyzed', description: 'Analyzed ml-pipeline repository' },
    { userId: teamLead.id, type: 'USER_LOGIN', title: 'User Login', description: 'Team lead logged in' },
  ];

  for (const activity of activities) {
    await prisma.activityLog.create({ data: activity });
  }

  // Create Notifications
  console.log('🔔 Creating notifications...');
  await prisma.notification.createMany({
    data: [
      {
        type: 'SUCCESS',
        title: 'Analysis Complete',
        message: 'Your repository analysis is ready to view',
        read: false,
        userId: developer1.id,
      },
      {
        type: 'INFO',
        title: 'New Feature Available',
        message: 'Check out the new AI-powered refactoring assistant',
        read: false,
        userId: developer1.id,
      },
      {
        type: 'SUCCESS',
        title: 'Documentation Generated',
        message: 'README.md has been generated for your repository',
        read: true,
        readAt: new Date(),
        userId: developer2.id,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Test Accounts:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:      admin@codepilot.ai / Password123!');
  console.log('Team Lead:  lead@codepilot.ai / Password123!');
  console.log('Developer:  john@codepilot.ai / Password123!');
  console.log('Developer:  emily@codepilot.ai / Password123!');
  console.log('Developer:  michael@codepilot.ai / Password123!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Made with Bob
