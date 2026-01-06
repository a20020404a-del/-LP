'use client';

import { useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container, Button } from '@/components/common';
import { cn } from '@/utils/cn';
import type { NavItem } from '@/types';

/**
 * Navigation items configuration
 */
const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Header component props
 */
export interface HeaderProps {
  /** Optional logo text */
  logoText?: string;
  /** Optional CTA button text */
  ctaText?: string;
  /** Optional CTA button href */
  ctaHref?: string;
}

/**
 * Animated header component with sticky behavior, scroll-based background changes,
 * smooth scrolling navigation, and mobile hamburger menu.
 *
 * @example
 * ```tsx
 * <Header logoText="Brand" ctaText="Get Started" ctaHref="#contact" />
 * ```
 */
export function Header({
  logoText = 'Brand',
  ctaText = 'Get Started',
  ctaHref = '#contact',
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Detect scroll position to change header background
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  /**
   * Handle smooth scroll to section
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80; // Header height offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }

      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    },
    []
  );

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /**
   * Close mobile menu
   */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-in-out'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Background with scroll-based animation */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(0px)' }}
          animate={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
            boxShadow: isScrolled
              ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              : '0 0 0 0 rgb(0 0 0 / 0)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        {/* Border bottom with scroll-based opacity */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <Container>
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 text-xl font-bold text-primary-600 md:text-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white md:h-10 md:w-10"
                whileHover={{ rotate: 5 }}
              >
                {logoText.charAt(0)}
              </motion.span>
              <span className="hidden sm:inline">{logoText}</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex lg:gap-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium lg:px-4 lg:text-base',
                    'text-neutral-600 hover:text-primary-600',
                    'rounded-lg transition-colors duration-200',
                    'hover:bg-primary-50'
                  )}
                  onClick={(e) => handleNavClick(e, item.href)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden items-center gap-4 md:flex">
              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById(ctaHref.replace('#', ''));
                  if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                {ctaText}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg md:hidden',
                'text-neutral-700 hover:bg-neutral-100',
                'transition-colors duration-200'
              )}
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-16 right-0 left-0 z-40 bg-white shadow-xl md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Container>
                <nav className="flex flex-col py-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'px-4 py-3 text-base font-medium',
                        'text-neutral-700 hover:text-primary-600',
                        'rounded-lg transition-colors duration-200',
                        'hover:bg-primary-50'
                      )}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {/* Mobile CTA Button */}
                  <motion.div
                    className="mt-4 px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={(e) => {
                        e.preventDefault();
                        const targetElement = document.getElementById(ctaHref.replace('#', ''));
                        if (targetElement) {
                          const headerOffset = 80;
                          const elementPosition = targetElement.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.scrollY - headerOffset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                        closeMobileMenu();
                      }}
                    >
                      {ctaText}
                    </Button>
                  </motion.div>
                </nav>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
