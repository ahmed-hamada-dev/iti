import styles from "./about.module.css";

export default function AboutPage() {
  const sections = [
    {
      title: "Reforestation Experts",
      content: "Squirrels are nature's gardeners. By burying nuts and occasionally forgetting their precise location, they facilitate the growth of millions of trees globally, maintaining the health of our forests.",
    },
    {
      title: "Ecosystem Balance",
      content: "They serve as a vital link in the food chain and help disperse fungi spores, which are essential for soil health and nutrient cycling in woodland areas.",
    },
    {
      title: "Remarkable Adaptations",
      content: "From their 180-degree rotating ankles to their bushy tails that serve as balance markers and umbrellas, squirrels are marvels of evolutionary engineering.",
    },
  ];

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="fade-in">Why Squirrels <span>Matter</span></h1>
          <p className={styles.subtitle + " fade-in"}>
            Beyond their playful antics, squirrels are foundational to many of the world's most critical ecosystems.
          </p>
        </div>

        <div className={styles.grid}>
          {sections.map((section, index) => (
            <div key={index} className={styles.card + " fade-in"}>
              <h3>{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
        </div>

        <div className={styles.contentHero + " fade-in"}>
          <h2>Protecting Our Smallest Allies</h2>
          <p>
            As urbanization continues to expand, protecting squirrel habitats is more important than ever. 
            By maintaining green spaces and old-growth trees, we ensure these brilliant creatures continue 
            their vital work for generations to come.
          </p>
        </div>
      </div>
    </section>
  );
}
