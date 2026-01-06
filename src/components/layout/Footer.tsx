import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Container } from '@/components/common';

/**
 * Navigation link item type
 */
interface NavLink {
  /** Link label text */
  label: string;
  /** Link href URL */
  href: string;
}

/**
 * Navigation section type
 */
interface NavSection {
  /** Section title */
  title: string;
  /** Section links */
  links: NavLink[];
}

/**
 * Social media link type
 */
interface SocialLink {
  /** Platform name for aria-label */
  name: string;
  /** Link href URL */
  href: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
}

/** Footer navigation sections */
const navSections: NavSection[] = [
  {
    title: 'サービス',
    links: [
      { label: '特徴', href: '#features' },
      { label: '料金', href: '#pricing' },
      { label: 'お客様の声', href: '#testimonials' },
    ],
  },
  {
    title: '会社情報',
    links: [
      { label: '会社概要', href: '#about' },
      { label: 'チーム', href: '#team' },
      { label: '採用情報', href: '#careers' },
    ],
  },
  {
    title: 'サポート',
    links: [
      { label: 'ヘルプセンター', href: '#help' },
      { label: 'お問い合わせ', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: '法的情報',
    links: [
      { label: 'プライバシーポリシー', href: '#privacy' },
      { label: '利用規約', href: '#terms' },
      { label: '特定商取引法', href: '#legal' },
    ],
  },
];

/** Social media links */
const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

/**
 * Footer component with navigation links, social icons, and company info
 *
 * Features:
 * - Logo and company description
 * - 4-column navigation (Services, Company, Support, Legal)
 * - Social media links with accessible icons
 * - Responsive design (4-col -> 2-col -> 1-col)
 * - Hover effects on all links
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  return (
    <footer
      className="bg-gray-900 py-12 text-gray-400"
      role="contentinfo"
      aria-label="サイトフッター"
    >
      <Container>
        {/* Main footer content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Logo and company info section */}
          <div className="sm:col-span-2">
            <div className="mb-4 text-2xl font-bold text-white">Sample</div>
            <p className="mb-6 text-sm leading-relaxed">
              株式会社サンプル
              <br />
              東京都渋谷区
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name}でフォロー`}
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation sections */}
          {navSections.map((section) => (
            <nav key={section.title} aria-label={`${section.title}メニュー`}>
              <h3 className="mb-4 font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors duration-200 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          {/* Copyright */}
          <p className="text-center text-sm">&copy; 2025 Sample Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
