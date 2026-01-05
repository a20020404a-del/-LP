import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import type { ContainerWidth } from '@/types';

/**
 * Container component props
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Container max width */
  maxWidth?: ContainerWidth;
  /** Center content horizontally */
  centered?: boolean;
  /** Add horizontal padding */
  withPadding?: boolean;
  /** As element type */
  as?: 'div' | 'section' | 'article' | 'main';
  /** Children content */
  children: ReactNode;
}

const maxWidthStyles: Record<ContainerWidth, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

/**
 * Container component for consistent page layout
 *
 * @example
 * ```tsx
 * <Container maxWidth="lg" withPadding>
 *   <h1>Page Title</h1>
 *   <p>Content goes here</p>
 * </Container>
 * ```
 */
export function Container({
  maxWidth = 'xl',
  centered = true,
  withPadding = true,
  as: Component = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        // Max width
        maxWidthStyles[maxWidth],
        // Centering
        centered && 'mx-auto',
        // Padding
        withPadding && 'px-4 sm:px-6 lg:px-8',
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
