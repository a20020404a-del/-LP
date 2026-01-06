import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Zap, Shield, BarChart3, Bot, Rocket,
  Check, Star, ArrowRight, Play, ChevronDown,
  Twitter, Linkedin, Github
} from 'lucide-react';

// ============================================
// COSMIC PREMIUM LP - AutoLP Landing Page
// Aesthetic: Deep space + Aurora + Glassmorphism
// ============================================

// Custom Fonts (add to index.html):
// <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
function ParticleField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ============================================
// TYPING ANIMATION
// ============================================
function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 inline-block w-[3px] h-[1em] bg-gradient-to-b from-cyan-400 to-fuchsia-400"
      />
    </span>
  );
}

// ============================================
// GLASSMORPHISM BUTTON
// ============================================
function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: unknown;
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-2xl font-medium
        ${sizes[size]}
        ${variant === 'primary'
          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
          : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

// ============================================
// BENTO CARD
// ============================================
function BentoCard({
  children,
  className = '',
  glowColor = 'violet',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'cyan' | 'fuchsia' | 'amber';
  delay?: number;
}) {
  const glowColors = {
    violet: 'hover:shadow-violet-500/20',
    cyan: 'hover:shadow-cyan-500/20',
    fuchsia: 'hover:shadow-fuchsia-500/20',
    amber: 'hover:shadow-amber-500/20',
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-3xl
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        backdrop-blur-xl border border-white/[0.08]
        transition-all duration-500
        hover:shadow-2xl ${glowColors[glowColor]}
        hover:border-white/20
        group
        ${className}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10
            border border-violet-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-violet-300">AI-Powered Automation</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white">Build </span>
          <TypeWriter words={['Faster', 'Smarter', 'Better', 'Effortlessly']} />
          <br />
          <span className="text-white/80">with AI Automation</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Transform your workflow with intelligent automation.
          Ship products 10x faster while maintaining exceptional quality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassButton variant="primary" size="lg">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </GlassButton>
          <GlassButton variant="secondary" size="lg">
            <Play className="w-5 h-5" />
            Watch Demo
          </GlassButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { value: 10000, suffix: '+', label: 'Active Users' },
            { value: 98, suffix: '%', label: 'Satisfaction' },
            { value: 50, suffix: 'M+', label: 'Tasks Automated' },
            { value: 24, suffix: '/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES BENTO GRID
// ============================================
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute complex workflows in milliseconds with our optimized AI engine.',
      gradient: 'from-amber-500 to-orange-500',
      glow: 'amber' as const,
      span: 'md:col-span-2',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and SOC 2 compliance.',
      gradient: 'from-cyan-500 to-blue-500',
      glow: 'cyan' as const,
      span: '',
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Autonomous agents that learn and adapt to your workflow.',
      gradient: 'from-violet-500 to-purple-500',
      glow: 'violet' as const,
      span: '',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Deep insights into your automation performance with live dashboards.',
      gradient: 'from-fuchsia-500 to-pink-500',
      glow: 'fuchsia' as const,
      span: 'md:col-span-2',
    },
  ];

  return (
    <section className="relative py-32 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-mono text-violet-400 tracking-wider uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything you need to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              automate at scale
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <BentoCard
              key={i}
              className={feature.span}
              glowColor={feature.glow}
              delay={i * 0.1}
            >
              <div className={`
                w-14 h-14 rounded-2xl mb-6 flex items-center justify-center
                bg-gradient-to-br ${feature.gradient}
                shadow-lg shadow-${feature.glow}-500/25
              `}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PRICING SECTION
// ============================================
function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: isYearly ? 79 : 9,
      period: isYearly ? '/year' : '/month',
      description: 'Perfect for individuals',
      features: ['5 AI Agents', '10K tasks/month', 'Email support', 'Basic analytics'],
      popular: false,
    },
    {
      name: 'Pro',
      price: isYearly ? 290 : 29,
      period: isYearly ? '/year' : '/month',
      description: 'Best for growing teams',
      features: ['Unlimited Agents', '100K tasks/month', 'Priority support', 'Advanced analytics', 'Custom integrations', 'Team collaboration'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Unlimited tasks', 'Dedicated support', 'SLA guarantee', 'On-premise option', 'Custom training'],
      popular: false,
    },
  ];

  return (
    <section className="relative py-32 px-6" id="pricing">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-mono text-violet-400 tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Start free and scale as you grow. No hidden fees.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? 'text-white' : 'text-white/50'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`
              relative w-14 h-7 rounded-full transition-colors
              ${isYearly ? 'bg-violet-600' : 'bg-white/20'}
            `}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 bg-white rounded-full"
              animate={{ left: isYearly ? '32px' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${isYearly ? 'text-white' : 'text-white/50'}`}>
            Yearly
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`
                relative p-8 rounded-3xl
                ${plan.popular
                  ? 'bg-gradient-to-b from-violet-600/20 to-fuchsia-600/20 border-2 border-violet-500/50'
                  : 'bg-white/[0.03] border border-white/10'
                }
                backdrop-blur-xl
              `}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                <span className="text-white/50">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <motion.li
                    key={j}
                    className="flex items-center gap-3 text-white/70"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <GlassButton
                variant={plan.popular ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
              >
                Get Started
              </GlassButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "AutoLP transformed our entire workflow. We're shipping 10x faster now.",
      author: 'Sarah Chen',
      role: 'CTO at TechFlow',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 5,
    },
    {
      quote: "The AI agents are incredibly intelligent. They learn and adapt to our needs.",
      author: 'Marcus Johnson',
      role: 'Founder at ScaleUp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
      rating: 5,
    },
    {
      quote: "Best investment we've made. ROI was visible within the first month.",
      author: 'Emily Rodriguez',
      role: 'VP Engineering at DataCorp',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-mono text-violet-400 tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Loved by thousands
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Quote Mark */}
              <div className="text-6xl text-violet-500/20 font-serif absolute top-4 left-6">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-white/80 text-lg mb-8 relative z-10">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full bg-white/10"
                />
                <div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative p-12 sm:p-16 rounded-[3rem] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600" />

          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />

          {/* Floating Shapes */}
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/10 blur-xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 text-center">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to transform
              <br />
              your workflow?
            </motion.h2>

            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Join 10,000+ teams already using AutoLP to automate their work.
              Start your free trial today.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl
                      border border-white/20 text-white placeholder-white/50
                      focus:outline-none focus:border-white/40"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-2xl bg-white text-violet-600 font-semibold
                      hover:bg-white/90 transition-colors"
                  >
                    Get Started
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="flex items-center justify-center gap-3 text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Check className="w-6 h-6" />
                  <span className="text-lg">Check your email for the magic link!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 mt-12 opacity-60">
              <span className="text-white/80 text-sm">Trusted by teams at</span>
              {['Google', 'Meta', 'Stripe', 'Vercel'].map((company) => (
                <span key={company} className="text-white font-semibold">{company}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AutoLP</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs mb-6">
              The most powerful AI automation platform for modern teams.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                    hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Resources', links: ['Docs', 'API', 'Community', 'Support'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 AutoLP. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a key={link} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// HEADER
// ============================================
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300
        ${isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : ''}
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AutoLP</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Testimonials', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-white/60 hover:text-white text-sm transition-colors hidden sm:block">
            Sign in
          </a>
          <GlassButton variant="primary" size="sm">
            Get Started
          </GlassButton>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function PremiumLP() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Outfit',sans-serif] overflow-x-hidden">
      <ParticleField />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
