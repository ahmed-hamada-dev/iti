import styles from "./features.module.css";

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
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Why they are <span>Extraordinary</span></h2>
          <p>More than just park dwellers, squirrels are sophisticated mammals with complex lives and critical forest roles.</p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card + " fade-in"}>
              <div className={styles.icon}></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
