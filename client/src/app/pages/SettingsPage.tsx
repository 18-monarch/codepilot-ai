// Settings page
import { motion } from 'motion/react';
import { Settings, User, Bell, Lock, Palette } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';

export function SettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-purple-500" />
          <h2>Profile Settings</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="mb-2 block">Full Name</label>
            <Input defaultValue="John Developer" />
          </div>
          <div>
            <label className="mb-2 block">Email</label>
            <Input defaultValue="john@example.com" type="email" />
          </div>
          <div>
            <label className="mb-2 block">Company</label>
            <Input defaultValue="Tech Corp" />
          </div>
          <GradientButton>Save Changes</GradientButton>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-purple-500" />
          <h2>Notifications</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          {[
            { label: 'Email notifications', desc: 'Receive email updates about your activity' },
            { label: 'Analysis complete alerts', desc: 'Get notified when repository analysis finishes' },
            { label: 'Weekly summary', desc: 'Receive weekly productivity summaries' },
            { label: 'Team updates', desc: 'Get notified about team member activity' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <h4 className="text-sm mb-1">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-purple-500" />
          <h2>Appearance</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="mb-3 block">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {['Dark', 'Light', 'System'].map((theme) => (
                <button
                  key={theme}
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'Dark'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border bg-muted/30 hover:border-purple-500/50'
                  }`}
                >
                  <span className="text-sm">{theme}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-purple-500" />
          <h2>Security</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm mb-1">Change Password</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Update your password to keep your account secure
            </p>
            <GradientButton variant="secondary" size="sm">
              Update Password
            </GradientButton>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm mb-1">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Add an extra layer of security to your account
            </p>
            <GradientButton variant="secondary" size="sm">
              Enable 2FA
            </GradientButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
