// Navbar component for landing page
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { GradientButton } from './GradientButton';
import { useAuthStore } from '../../stores/authStore';

interface NavbarProps {
  onGetStarted?: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold">CodePilot AI</h2>
              <p className="text-xs text-muted-foreground">Workspace</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Workflow
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <GradientButton variant="secondary" size="sm" onClick={handleSignIn}>
                  Sign In
                </GradientButton>
                <GradientButton size="sm" onClick={onGetStarted}>
                  Get Started
                </GradientButton>
              </>
            ) : (
              <GradientButton size="sm" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Made with Bob
