import GooGooMascot from '@/components/GooGooMascot';
import GooGooParticles from '@/components/GooGooParticles';
import Home from '@/pages/Home';

export default function App() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Ambient goo goo particles (bubbles, stars, wisps) */}
      <GooGooParticles />

      {/* The interactive goo goo mascot */}
      <GooGooMascot />

      {/* Page content */}
      <Home />
    </>
  );
}
