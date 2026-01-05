import { Header, Footer } from '@/components/layout';
import { Hero } from '@/components/sections';

/**
 * Main App component
 * Landing page layout with header, main content, and footer
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Additional sections will be added here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
