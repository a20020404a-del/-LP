import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Section, Card } from '@/components/common';
import type { Testimonial } from '@/types';

/**
 * Testimonial data with rating
 */
interface TestimonialWithRating extends Testimonial {
  /** Star rating (1-5) */
  rating: number;
}

/**
 * Testimonials section props
 */
export interface TestimonialsSectionProps {
  /** Section ID for navigation */
  id?: string;
}

/**
 * Stats data for the testimonials section
 */
interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '1,000+', label: '導入企業' },
  { value: '98%', label: '満足度' },
  { value: '95%', label: '継続率' },
];

const testimonials: TestimonialWithRating[] = [
  {
    name: '田中 太郎',
    role: 'CEO',
    company: 'テック株式会社',
    content: '業務効率が3倍になりました',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
    rating: 5,
  },
  {
    name: '佐藤 花子',
    role: 'マーケティング部長',
    company: 'グロース株式会社',
    content: '導入してすぐに効果を実感',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
    rating: 5,
  },
  {
    name: '鈴木 一郎',
    role: 'CTO',
    company: 'イノベーション株式会社',
    content: 'サポートが手厚くて安心',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
    rating: 5,
  },
];

/**
 * Star rating component
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Animation variants for stagger effect
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Testimonials section component
 *
 * Displays customer testimonials with ratings, stats, and staggered animations.
 *
 * @example
 * ```tsx
 * <Testimonials id="testimonials" />
 * ```
 */
export function Testimonials({ id }: TestimonialsSectionProps) {
  return (
    <Section
      id={id}
      title="お客様の声"
      subtitle="Customer Testimonials"
      bgColor="neutral"
      paddingY="lg"
    >
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl font-bold text-primary-600 sm:text-5xl">{stat.value}</div>
            <div className="mt-2 text-neutral-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.name} variants={itemVariants}>
            <Card variant="elevated" padding="lg" hoverable className="h-full">
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary-200" />
              </div>

              {/* Testimonial Content */}
              <p className="mb-6 text-lg text-neutral-700">{`「${testimonial.content}」`}</p>

              {/* Star Rating */}
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-12 w-12 overflow-hidden rounded-full bg-neutral-100">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name and Role */}
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
