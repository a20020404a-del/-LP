import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';
import type { ContainerWidth } from '@/types';

/**
 * Section component props
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Container max width */
  maxWidth?: ContainerWidth;
  /** Background color variant */
  bgColor?: 'white' | 'neutral' | 'primary' | 'gradient';
  /** Vertical padding size */
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  /** Children content */
  children: ReactNode;
}

const bgColorStyles: Record<string, string> = {
  white: 'bg-white',
  neutral: 'bg-neutral-50',
  primary: 'bg-primary-50',
  gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50',
};

const paddingYStyles: Record<string, string> = {
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
  xl: 'py-24 sm:py-32',
};

/**
 * Section component for LP page sections
 *
 * @example
 * ```tsx
 * <Section title="Features" subtitle="What we offer" bgColor="neutral">
 *   <FeatureList />
 * </Section>
 * ```
 */
export function Section({
  title,
  subtitle,
  maxWidth = 'xl',
  bgColor = 'white',
  paddingY = 'lg',
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn(bgColorStyles[bgColor], paddingYStyles[paddingY], className)} {...props}>
      <Container maxWidth={maxWidth}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {subtitle && (
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-600">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h2>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
