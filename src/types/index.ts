/**
 * Common type definitions for the LP project
 */

/** Button variant types */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/** Button size types */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Container width types */
export type ContainerWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Base component props with children */
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

/** Component props with id */
export interface WithId {
  id?: string;
}

/** Form field state */
export interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/** Section props for LP sections */
export interface SectionProps extends BaseProps, WithId {
  title?: string;
  subtitle?: string;
}

/** Navigation item */
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Feature card data */
export interface FeatureCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/** Testimonial data */
export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatar?: string;
}

/** FAQ item */
export interface FAQItem {
  question: string;
  answer: string;
}

/** CTA (Call to Action) props */
export interface CTAProps {
  title: string;
  description?: string;
  primaryButtonText: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}
