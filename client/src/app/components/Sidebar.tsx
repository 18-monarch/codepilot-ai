// Sidebar navigation component
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  TestTube,
  Bug,
  Sparkles,
  GraduationCap,
  Settings,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useLogout } from "../../hooks/useAuth";

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "analyzer",
    label: "Repository Analyzer",
    icon: FolderGit2,
    path: "/repository-analyzer",
  },
  {
    id: "docs",
    label: "Documentation Generator",
    icon: FileText,
    path: "/documentation-generator",
  },
  {
    id: "test",
    label: "Test Generator",
    icon: TestTube,
    path: "/test-generator",
  },
  {
    id: "debug",
    label: "Debug Assistant",
    icon: Bug,
    path: "/debug-assistant",
  },
  {
    id: "onboarding",
    label: "AI Onboarding",
    icon: GraduationCap,
    path: "/ai-onboarding",
  },
];

export function Sidebar({
  currentPath,
  onNavigate,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold">CodePilot AI</h2>
            <p className="text-xs text-muted-foreground">
              Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => {
                onNavigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm truncate">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* Settings & Logout */}
        <div className="space-y-1">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => {
              onNavigate('/settings');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentPath === '/settings'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 4 }}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </motion.button>
        </div>

        {/* IBM Bob Badge */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30 rounded-lg p-3">
          <p className="text-xs font-medium mb-1">
            Powered by IBM Bob
          </p>
          <p className="text-xs text-muted-foreground">
            AI Developer Assistant
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-card border border-border p-2 rounded-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 h-screen sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-72 z-50"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </>
  );
}