import Galaxy from '../Galaxy';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-24 h-[70vh] pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0F19]" />

      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.6}
          saturation={0.5}
          hueShift={20}
          twinkleIntensity={0.8}
          rotationSpeed={0.05}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.8}
          speed={1.5}
        />
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center z-10 pointer-events-none">


        <div className="text-center mb-12 w-full max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
