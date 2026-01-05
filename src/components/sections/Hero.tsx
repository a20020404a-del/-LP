import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Container } from '@/components/common';

/**
 * Hero section component placeholder
 * TODO: Customize headline, description, and CTA
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Your Compelling
            <span className="text-primary-600"> Headline </span>
            Goes Here
          </h1>
          <p className="mb-10 text-lg text-neutral-600 sm:text-xl">
            A brief description of your product or service. Explain the value proposition and why
            visitors should care about what you offer.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200 opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary-200 opacity-20 blur-3xl" />
    </section>
  );
}
