export default function Features() {
  const features = [
    {
      title: "Nature's Foresters",
      description: "Squirrels bury thousands of nuts each year. The forgotten ones grow into new trees, making squirrels the primary planters of oak and walnut forests.",
    },
    {
      title: "Masters of Deception",
      description: "To protect their food, squirrels will pretend to bury nuts when they know they're being watched by potential thieves.",
    },
    {
      title: "Super-Powered Jumpers",
      description: "They can leap horizontally up to 20 feet and fall from heights of 100 feet without injury, thanks to their incredible anatomy.",
    },
    {
      title: "Universal Communicators",
      description: "Using complex tail flickers and chirps, squirrels communicate warnings about predators and even signal food sources to their community.",
    },
  ];

  return (
    <section className="py-24 bg-bg-primary md:py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold mb-4 md:text-[2rem]">Why they are <span className="text-accent">Extraordinary</span></h2>
          <p className="max-w-[600px] mx-auto text-[1.1rem]">More than just park dwellers, squirrels are sophisticated mammals with complex lives and critical forest roles.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-bg-secondary border border-border rounded-[16px] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-accent fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 bg-accent rounded-[12px] mb-6 opacity-15 transition-opacity group-hover:opacity-100"></div>
              <h3 className="mb-4 text-[1.4rem] font-bold text-text-primary">{feature.title}</h3>
              <p className="leading-relaxed text-[1rem] text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

