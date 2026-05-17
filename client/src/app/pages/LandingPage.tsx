// Landing page with hero, features, and testimonials
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { GradientButton } from '../components/GradientButton';
import { FeatureCard } from '../components/FeatureCard';
import { Play, ArrowRight, Zap, Shield, Users, CheckCircle } from 'lucide-react';
import { features, testimonials } from '../../data/mockData';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={onGetStarted} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* IBM Bob Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8"
            >
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Powered by IBM Bob</span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              Turn Ideas Into Impact Faster
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              An AI-powered developer workspace that helps teams understand codebases, generate documentation, debug faster, and automate repetitive development tasks using IBM Bob.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <GradientButton size="lg" onClick={onGetStarted}>
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>
              <GradientButton variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </span>
              </GradientButton>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-3xl" />
              <div className="relative bg-card border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="text-4xl font-bold text-purple-500 mb-2">10x</div>
                    <p className="text-sm text-muted-foreground">Faster Onboarding</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="text-4xl font-bold text-blue-500 mb-2">85%</div>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="text-4xl font-bold text-purple-500 mb-2">2.5k+</div>
                    <p className="text-sm text-muted-foreground">Happy Developers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Supercharge Your Development</h2>
            <p className="text-muted-foreground text-lg">
              AI-powered tools that make complex tasks simple
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to AI-powered development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect', desc: 'Link your GitHub repository or upload your codebase' },
              { step: '02', title: 'Analyze', desc: 'AI instantly understands your architecture and patterns' },
              { step: '03', title: 'Accelerate', desc: 'Generate docs, tests, and debug faster than ever' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by Developers</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of teams shipping faster
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-30" />
            <div className="relative bg-card border border-purple-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of developers building faster with AI
              </p>
              <GradientButton size="lg" onClick={onGetStarted}>
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">
                © 2026 CodePilot AI. Powered by IBM Bob.
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
