import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button, Container } from '@/components/common';

/**
 * Animation variants for stagger effect
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/**
 * Hero section component for the landing page
 *
 * Features:
 * - Main headline: "ビジネスを次のステージへ"
 * - Subheadline with value proposition
 * - Primary and secondary CTA buttons
 * - Blue to purple gradient background
 * - Framer Motion stagger animations
 * - Full viewport height with minimum 600px
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */
export function Hero() {
  /**
   * Handle smooth scroll to next section
   */
  const handleScrollDown = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600"
      style={{ minHeight: '100vh' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            ビジネスを
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              次のステージへ
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 md:text-xl lg:text-2xl"
          >
            AIと自動化で、あなたのビジネスを劇的に変革します
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-white"
            >
              無料で始める
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-white"
            >
              詳しく見る
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants} className="mt-16">
            <button
              onClick={handleScrollDown}
              className="group inline-flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
              aria-label="Scroll to next section"
            >
              <span className="text-sm font-medium">スクロール</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}
