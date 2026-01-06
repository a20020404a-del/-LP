import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Section, Button, Card, CardHeader, CardBody, CardFooter } from '@/components/common';
import { cn } from '@/utils/cn';

/**
 * Feature item in pricing plan
 */
interface PricingFeature {
  /** Feature name */
  name: string;
  /** Whether feature is included in this plan */
  included: boolean;
}

/**
 * Pricing plan data structure
 */
interface PricingPlan {
  /** Plan name */
  name: string;
  /** Plan price display string */
  price: string;
  /** Price period (e.g., "/month") */
  period?: string;
  /** Plan description */
  description: string;
  /** List of features */
  features: PricingFeature[];
  /** Whether this plan is recommended */
  recommended?: boolean;
  /** CTA button text */
  ctaText: string;
  /** CTA button variant */
  ctaVariant?: 'primary' | 'outline';
}

/**
 * Pricing plans data
 */
const pricingPlans: PricingPlan[] = [
  {
    name: 'スターター',
    price: '9,800',
    period: '/月',
    description: '個人・小規模向け',
    ctaText: '無料で始める',
    ctaVariant: 'outline',
    features: [
      { name: '基本機能', included: true },
      { name: 'メールサポート', included: true },
      { name: '月5GBストレージ', included: true },
      { name: 'API連携', included: false },
      { name: '優先サポート', included: false },
      { name: 'カスタム機能', included: false },
    ],
  },
  {
    name: 'プロフェッショナル',
    price: '29,800',
    period: '/月',
    description: '中規模ビジネス向け',
    recommended: true,
    ctaText: '今すぐ申し込む',
    ctaVariant: 'primary',
    features: [
      { name: '基本機能', included: true },
      { name: 'メールサポート', included: true },
      { name: '月50GBストレージ', included: true },
      { name: 'API連携', included: true },
      { name: '優先サポート', included: true },
      { name: 'カスタム機能', included: false },
    ],
  },
  {
    name: 'エンタープライズ',
    price: 'お問い合わせ',
    description: '大規模向け',
    ctaText: 'お問い合わせ',
    ctaVariant: 'outline',
    features: [
      { name: '基本機能', included: true },
      { name: 'メールサポート', included: true },
      { name: '無制限ストレージ', included: true },
      { name: 'API連携', included: true },
      { name: '優先サポート', included: true },
      { name: 'カスタム機能', included: true },
    ],
  },
];

/**
 * Animation variants for staggered card animations
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
 * Feature list item component
 */
function FeatureItem({ feature }: { feature: PricingFeature }) {
  return (
    <li className="flex items-center gap-3 py-2">
      {feature.included ? (
        <Check className="h-5 w-5 flex-shrink-0 text-primary-500" />
      ) : (
        <X className="h-5 w-5 flex-shrink-0 text-neutral-300" />
      )}
      <span className={cn('text-sm', feature.included ? 'text-neutral-700' : 'text-neutral-400')}>
        {feature.name}
      </span>
    </li>
  );
}

/**
 * Individual pricing card component
 */
function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <motion.div variants={cardVariants}>
      <Card
        variant="elevated"
        padding="none"
        className={cn(
          'relative flex h-full flex-col overflow-hidden',
          plan.recommended && 'scale-105 border-2 border-primary-500 shadow-xl'
        )}
      >
        {/* Recommended badge */}
        {plan.recommended && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary-500 px-4 py-1 text-xs font-semibold text-white">
              おすすめ
            </div>
          </div>
        )}

        <CardHeader className="p-6 pb-4 text-center">
          <h3 className="mb-2 text-xl font-bold text-neutral-900">{plan.name}</h3>
          <p className="mb-4 text-sm text-neutral-500">{plan.description}</p>
          <div className="flex items-baseline justify-center">
            {plan.price !== 'お問い合わせ' && (
              <span className="text-lg font-medium text-neutral-500">¥</span>
            )}
            <span className="text-4xl font-bold text-neutral-900">{plan.price}</span>
            {plan.period && <span className="ml-1 text-neutral-500">{plan.period}</span>}
          </div>
        </CardHeader>

        <CardBody className="flex-1 px-6">
          <ul className="space-y-1">
            {plan.features.map((feature) => (
              <FeatureItem key={feature.name} feature={feature} />
            ))}
          </ul>
        </CardBody>

        <CardFooter className="border-t-0 p-6 pt-4">
          <Button variant={plan.ctaVariant} fullWidth size="lg">
            {plan.ctaText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

/**
 * Pricing section component
 * Displays pricing plans with feature comparison
 *
 * @example
 * ```tsx
 * <Pricing />
 * ```
 */
export function Pricing() {
  return (
    <Section id="pricing" title="料金プラン" subtitle="Pricing" bgColor="neutral" paddingY="lg">
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </motion.div>

      {/* Additional info */}
      <motion.p
        className="mt-12 text-center text-sm text-neutral-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        全プラン14日間無料トライアル付き。いつでもキャンセル可能です。
      </motion.p>
    </Section>
  );
}
