import { Container } from '@/components/common';

/**
 * Footer component placeholder
 * TODO: Implement footer links, social icons, and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 py-12 text-neutral-400">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 text-xl font-bold text-white">Logo</div>
            <p className="text-sm">Your company description goes here.</p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <p className="text-sm">info@example.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
