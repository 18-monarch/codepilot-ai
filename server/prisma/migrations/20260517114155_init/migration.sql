-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEAM_LEAD', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "RepositoryStatus" AS ENUM ('PENDING', 'ANALYZING', 'ANALYZED', 'FAILED');

-- CreateEnum
CREATE TYPE "AIAnalysisType" AS ENUM ('REPOSITORY', 'CODE_QUALITY', 'SECURITY', 'PERFORMANCE', 'ARCHITECTURE');

-- CreateEnum
CREATE TYPE "AIAnalysisStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "DocumentationType" AS ENUM ('README', 'API_DOCS', 'ARCHITECTURE', 'SETUP_GUIDE', 'CONTRIBUTING', 'CHANGELOG', 'INLINE_COMMENTS');

-- CreateEnum
CREATE TYPE "TestFramework" AS ENUM ('JEST', 'VITEST', 'MOCHA', 'PYTEST', 'JUNIT', 'RSPEC');

-- CreateEnum
CREATE TYPE "DebugSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('REPOSITORY_ANALYZED', 'DOCUMENTATION_GENERATED', 'TEST_GENERATED', 'DEBUG_SESSION', 'REFACTORING', 'ONBOARDING_CREATED', 'USER_LOGIN', 'USER_LOGOUT');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'DEVELOPER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "avatar" TEXT,
    "bio" TEXT,
    "githubUsername" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "teamId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "openIssues" INTEGER NOT NULL DEFAULT 0,
    "size" INTEGER NOT NULL DEFAULT 0,
    "defaultBranch" TEXT NOT NULL DEFAULT 'main',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "status" "RepositoryStatus" NOT NULL DEFAULT 'PENDING',
    "githubId" TEXT,
    "owner" TEXT,
    "fullName" TEXT,
    "filesCount" INTEGER NOT NULL DEFAULT 0,
    "linesOfCode" INTEGER NOT NULL DEFAULT 0,
    "dependenciesCount" INTEGER NOT NULL DEFAULT 0,
    "lastAnalyzedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT,
    "repositoryId" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_stack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "type" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_analyses" (
    "id" TEXT NOT NULL,
    "type" "AIAnalysisType" NOT NULL,
    "status" "AIAnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "input" JSONB,
    "summary" TEXT,
    "insights" JSONB,
    "recommendations" JSONB,
    "metrics" JSONB,
    "processingTime" INTEGER,
    "tokensUsed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "repositoryId" TEXT,

    CONSTRAINT "ai_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "DocumentationType" NOT NULL,
    "content" TEXT NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'markdown',
    "wordCount" INTEGER NOT NULL DEFAULT 0,
    "readingTime" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "repositoryId" TEXT,

    CONSTRAINT "documentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_suites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "framework" "TestFramework" NOT NULL,
    "language" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "testCode" TEXT NOT NULL,
    "testsCount" INTEGER NOT NULL DEFAULT 0,
    "coverage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "repositoryId" TEXT,

    CONSTRAINT "test_suites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debug_sessions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "stackTrace" TEXT,
    "errorType" TEXT,
    "rootCause" TEXT,
    "suggestions" JSONB,
    "fixedCode" TEXT,
    "severity" "DebugSeverity" NOT NULL DEFAULT 'MEDIUM',
    "language" TEXT,
    "framework" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "debug_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refactorings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "originalCode" TEXT NOT NULL,
    "refactoredCode" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "improvements" JSONB,
    "metrics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refactorings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_guides" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "setupSteps" JSONB NOT NULL,
    "keyFiles" JSONB,
    "architecture" TEXT,
    "conventions" JSONB,
    "commonIssues" JSONB,
    "estimatedTime" INTEGER,
    "difficulty" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "onboarding_guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'INFO',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_teamId_idx" ON "users"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_githubId_key" ON "repositories"("githubId");

-- CreateIndex
CREATE INDEX "repositories_userId_idx" ON "repositories"("userId");

-- CreateIndex
CREATE INDEX "repositories_status_idx" ON "repositories"("status");

-- CreateIndex
CREATE INDEX "projects_userId_idx" ON "projects"("userId");

-- CreateIndex
CREATE INDEX "projects_teamId_idx" ON "projects"("teamId");

-- CreateIndex
CREATE INDEX "tech_stack_repositoryId_idx" ON "tech_stack"("repositoryId");

-- CreateIndex
CREATE INDEX "ai_analyses_userId_idx" ON "ai_analyses"("userId");

-- CreateIndex
CREATE INDEX "ai_analyses_repositoryId_idx" ON "ai_analyses"("repositoryId");

-- CreateIndex
CREATE INDEX "ai_analyses_status_idx" ON "ai_analyses"("status");

-- CreateIndex
CREATE INDEX "documentations_userId_idx" ON "documentations"("userId");

-- CreateIndex
CREATE INDEX "documentations_repositoryId_idx" ON "documentations"("repositoryId");

-- CreateIndex
CREATE INDEX "test_suites_userId_idx" ON "test_suites"("userId");

-- CreateIndex
CREATE INDEX "test_suites_repositoryId_idx" ON "test_suites"("repositoryId");

-- CreateIndex
CREATE INDEX "debug_sessions_userId_idx" ON "debug_sessions"("userId");

-- CreateIndex
CREATE INDEX "debug_sessions_resolved_idx" ON "debug_sessions"("resolved");

-- CreateIndex
CREATE INDEX "refactorings_userId_idx" ON "refactorings"("userId");

-- CreateIndex
CREATE INDEX "onboarding_guides_userId_idx" ON "onboarding_guides"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_userId_idx" ON "activity_logs"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_createdAt_idx" ON "activity_logs"("createdAt");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_read_idx" ON "notifications"("read");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_stack" ADD CONSTRAINT "tech_stack_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_analyses" ADD CONSTRAINT "ai_analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_analyses" ADD CONSTRAINT "ai_analyses_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentations" ADD CONSTRAINT "documentations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentations" ADD CONSTRAINT "documentations_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_suites" ADD CONSTRAINT "test_suites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_suites" ADD CONSTRAINT "test_suites_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debug_sessions" ADD CONSTRAINT "debug_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refactorings" ADD CONSTRAINT "refactorings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_guides" ADD CONSTRAINT "onboarding_guides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
