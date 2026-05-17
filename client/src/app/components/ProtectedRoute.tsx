// Protected route component for authentication
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { useProfile } from '../../hooks/useAuth';
import { LoadingSkeleton } from './LoadingSkeleton';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, setUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const { data: profile, isLoading: isProfileLoading, error } = useProfile();

  // Update user in store when profile is fetched
  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      logout();
      navigate('/', { replace: true });
    }
  }, [error, logout, navigate]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while checking auth or fetching profile
  if (isLoading || (isAuthenticated && isProfileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

// Made with Bob
