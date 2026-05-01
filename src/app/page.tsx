import Hero    from '@/components/sections/Hero';
import Work    from '@/components/sections/Work';
import About   from '@/components/sections/About';
import Books   from '@/components/sections/Books';
import Contact from '@/components/sections/Contact';
import Footer  from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <About />
      <Books />
      <Contact />
      <Footer />
    </main>
  );
}