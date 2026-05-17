// Dashboard page with stats and activity
import { motion } from 'motion/react';
import { StatsCard } from '../components/StatsCard';
import { RepoCard } from '../components/RepoCard';
import { Upload, Sparkles, TrendingUp } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { useUserStats, useUserActivities } from '../../hooks/useUsers';
import { useRepositories } from '../../hooks/useRepositories';
import { useWeeklyActivity } from '../../hooks/useAnalytics';

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const { data: activities, isLoading: activitiesLoading } = useUserActivities();
  const { data: repositories, isLoading: reposLoading } = useRepositories();
  const { data: weeklyData, isLoading: weeklyLoading } = useWeeklyActivity();

  if (statsLoading || activitiesLoading || reposLoading || weeklyLoading) {
    return (
      <div className="p-6 md:p-8">
        <LoadingSkeleton />
      </div>
    );
  }

  const mockStats = [
    {
      label: 'Repositories Analyzed',
      value: stats?.repositoriesAnalyzed?.toString() || '0',
      change: '+12%',
      trend: 'up' as const,
      icon: 'FolderGit2' as const,
    },
    {
      label: 'Documentation Generated',
      value: stats?.documentationGenerated?.toString() || '0',
      change: '+23%',
      trend: 'up' as const,
      icon: 'FileText' as const,
    },
    {
      label: 'Bugs Fixed',
      value: stats?.bugsFixed?.toString() || '0',
      change: '+8%',
      trend: 'up' as const,
      icon: 'Bug' as const,
    },
    {
      label: 'Time Saved',
      value: stats?.timeSaved || '0h',
      change: '+15%',
      trend: 'up' as const,
      icon: 'Clock' as const,
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-2xl" />
        <div className="relative bg-card border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back! 👋</h1>
              <p className="text-muted-foreground">
                Ready to accelerate your development workflow today?
              </p>
            </div>
            <GradientButton>
              <span className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Repository
              </span>
            </GradientButton>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h2>Weekly Activity</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111117',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="analyses" stroke="#8b5cf6" strokeWidth={2} name="Analyses" />
            <Line type="monotone" dataKey="docs" stroke="#3b82f6" strokeWidth={2} name="Docs" />
            <Line type="monotone" dataKey="tests" stroke="#10b981" strokeWidth={2} name="Tests" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h2>Recent AI Activity</h2>
          </div>
          <div className="space-y-4">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border hover:border-purple-500/30 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'in-progress' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
            )}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="mb-6">Recent Projects</h2>
          <div className="space-y-4">
            {repositories && repositories.length > 0 ? (
              repositories.slice(0, 3).map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No repositories yet</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <h2 className="mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Analyze Repository', icon: '🔍' },
            { label: 'Generate Docs', icon: '📝' },
            { label: 'Create Tests', icon: '🧪' },
            { label: 'Debug Code', icon: '🐛' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border hover:border-purple-500/50 hover:bg-muted/50 transition-all"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
