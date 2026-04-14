import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-bg-secondary py-40 pb-24 min-h-[85vh] flex items-center overflow-hidden lg:py-32 lg:pb-16">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-[1.1fr_0.9fr] items-center gap-16 w-full md:grid-cols-1 md:text-center md:gap-12">
        <div className="relative w-full flex justify-end md:justify-center md:order-first">
          <Image
            src="/images/hero.png"
            alt="Squirrel in the forest"
            className="w-full h-[550px] object-cover rounded-[32px] shadow-[20px_20px_0px_0px_rgba(16,185,129,0.2)] bg-border lg:h-[450px] md:h-[350px] md:shadow-none"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="mb-6 text-text-primary text-[4rem] font-semibold leading-tight lg:text-[3.25rem] fade-in [animation-delay:100ms]">
            Explore the Secret Life of{" "}
            <span className="text-accent">Squirrels</span>
          </h1>
          <p className="text-[1.25rem] mb-10 max-w-[550px] text-text-secondary md:mx-auto fade-in [animation-delay:300ms]">
            From planting forests to escaping predators with lightning speed,
            squirrels are nature's most fascinating and intelligent gardeners.
          </p>
          <div className="flex gap-6 md:justify-center fade-in [animation-delay:500ms]">
            <Link
              href={"/blogs"}
              className="bg-accent text-white py-5 px-10 border-none text-[1.1rem] rounded-[12px] hover:bg-accent-hover hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
