import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/hero.png"
            alt="Squirrel in the forest"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.fadeIn}>
            Explore the Secret Life of <span>Squirrels</span>
          </h1>
          <p className={styles.fadeIn}>
            From planting forests to escaping predators with lightning speed,
            squirrels are nature's most fascinating and intelligent gardeners.
          </p>
          <div className={styles.actions + " " + styles.fadeIn}>
            <button className={styles.primary}>Discover More</button>
            <button className={styles.secondary}>Our Mission</button>
          </div>
        </div>
      </div>
    </section>
  );
}
