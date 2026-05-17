// Main application component with routing
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { RepositoryAnalyzerPage } from './pages/RepositoryAnalyzerPage';
import { DocumentationGeneratorPage } from './pages/DocumentationGeneratorPage';
import { DebugAssistantPage } from './pages/DebugAssistantPage';
import { TestGeneratorPage } from './pages/TestGeneratorPage';
import { AIOnboardingPage } from './pages/AIOnboardingPage';
import { SettingsPage } from './pages/SettingsPage';
import { RefactorAssistantPage } from './pages/RefactorAssistantPage';

// Components
import { Sidebar } from './components/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { QueryProvider } from '../lib/react-query/QueryProvider';
import { Toaster } from './components/ui/sonner';

// Store
import { useAuthStore } from '../stores/authStore';

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <Sidebar currentPath={location.pathname} onNavigate={navigate} />
        <main className="flex-1 lg:ml-0">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/repository-analyzer" element={<RepositoryAnalyzerPage />} />
            <Route path="/documentation-generator" element={<DocumentationGeneratorPage />} />
            <Route path="/test-generator" element={<TestGeneratorPage />} />
            <Route path="/debug-assistant" element={<DebugAssistantPage />} />
            <Route path="/refactor-assistant" element={<RefactorAssistantPage />} />
            <Route path="/ai-onboarding" element={<AIOnboardingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { restoreSession, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const handleGetStarted = () => {
    // If authenticated, go to dashboard; otherwise go to signup
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster />
      </BrowserRouter>
    </QueryProvider>
  );
}