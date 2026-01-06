import { Header, Footer } from '@/components/layout';
import { Hero, Features, Pricing, Testimonials, Contact } from '@/components/sections';

/**
 * Main App component
 * Landing page layout with header, main content, and footer
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header logoText="AutoLP" ctaText="お問い合わせ" ctaHref="#contact" />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials id="testimonials" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
