import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAds } from '../../hooks/useAds';

const MAX_SLIDES = 5;
const AUTO_ROTATE_MS = 7000;

const AdsBanner = () => {
    const { data: ads = [], isLoading, error } = useAds({ active: true, _sort: 'priority', _order: 'desc', _limit: MAX_SLIDES });
    const slides = useMemo(() => ads.slice(0, MAX_SLIDES), [ads]);
    const [activeIndex, setActiveIndex] = useState(0);
    const ad = slides[activeIndex];

    useEffect(() => {
        if (!slides.length) return;

        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, AUTO_ROTATE_MS);

        return () => window.clearInterval(interval);
    }, [slides.length]);

    if (isLoading) {
        return (
            <div className="rounded-[2rem] border border-white/10 shadow-2xl bg-slate-900/80 h-130 p-8 animate-pulse md:p-10">
                <div className="h-full rounded-3xl bg-slate-800" />
            </div>
        );
    }

    if (error || !ad) {
        return null;
    }

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-slate-950 text-white h-130 sm:h-130">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700"
                style={{ backgroundImage: `url('${ad.image}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-transparent" />

            <div className="relative h-full px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
                <div className="flex h-full flex-col justify-between">
                    <div className="max-w-4xl space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200 ring-1 ring-indigo-400/20">
                            Sponsored
                        </span>
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">{ad.title}</h2>
                            <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-8 line-clamp-3">
                                {ad.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href={ad.href || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            {ad.ctaText || 'Learn More'}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        {ad.badge && (
                            <span className="inline-flex items-center rounded-3xl border border-slate-200/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                                {ad.badge}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {slides.map((slide, idx) => (
                    <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`h-2.5 rounded-full bg-white/60 transition-all duration-300 ${activeIndex === idx ? 'w-10 bg-white' : 'w-3 hover:w-6 hover:bg-white/80'}`}
                        aria-label={`Show ad ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default AdsBanner;
