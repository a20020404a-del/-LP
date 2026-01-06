import { motion } from 'framer-motion';
import {
  Rocket,
  Shield,
  Target,
  BarChart3,
  Bot,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { Section, Card, CardHeader, CardBody } from '@/components/common';

/**
 * Feature item interface
 */
interface FeatureItem {
  /** Feature icon */
  icon: LucideIcon;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

/**
 * Feature data for the section
 */
const features: FeatureItem[] = [
  {
    icon: Rocket,
    title: '高速パフォーマンス',
    description: '最新技術で圧倒的な速度を実現',
  },
  {
    icon: Shield,
    title: 'セキュリティ',
    description: '企業レベルのセキュリティ対策',
  },
  {
    icon: Target,
    title: 'カスタマイズ',
    description: 'あなたのビジネスに最適化',
  },
  {
    icon: BarChart3,
    title: '分析機能',
    description: 'データドリブンな意思決定',
  },
  {
    icon: Bot,
    title: 'AI搭載',
    description: '最先端のAI技術を活用',
  },
  {
    icon: MessageCircle,
    title: 'サポート',
    description: '24時間365日の手厚いサポート',
  },
];

/**
 * Animation variants for container
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Animation variants for individual cards
 */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

/**
 * Feature card component
 */
interface FeatureCardProps {
  feature: FeatureItem;
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div variants={cardVariants}>
      <Card
        variant="elevated"
        padding="lg"
        hoverable
        className="h-full text-center transition-all duration-300 hover:-translate-y-1"
      >
        <CardHeader className="mb-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
            <Icon className="h-7 w-7" />
          </div>
        </CardHeader>
        <CardBody>
          <h3 className="mb-2 text-lg font-semibold text-neutral-900">{feature.title}</h3>
          <p className="text-sm text-neutral-600">{feature.description}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
}

/**
 * Features section component
 *
 * Displays a grid of feature cards with staggered scroll animations.
 * Uses 3-column grid on desktop, 2 columns on tablet, and 1 column on mobile.
 *
 * @example
 * ```tsx
 * <Features />
 * ```
 */
export function Features() {
  return (
    <Section
      id="features"
      title="なぜ選ばれるのか"
      subtitle="Features"
      bgColor="neutral"
      paddingY="lg"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </motion.div>
    </Section>
  );
}
