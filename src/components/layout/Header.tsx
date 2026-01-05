import { Container } from '@/components/common';

/**
 * Header component placeholder
 * TODO: Implement navigation, logo, and mobile menu
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="text-xl font-bold text-primary-600">Logo</div>
          <nav className="hidden space-x-8 md:flex">
            <a href="#features" className="text-neutral-600 hover:text-primary-600">
              Features
            </a>
            <a href="#about" className="text-neutral-600 hover:text-primary-600">
              About
            </a>
            <a href="#contact" className="text-neutral-600 hover:text-primary-600">
              Contact
            </a>
          </nav>
          <button className="md:hidden">Menu</button>
        </div>
      </Container>
    </header>
  );
}
