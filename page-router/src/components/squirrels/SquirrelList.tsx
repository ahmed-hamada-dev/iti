import { squirrels } from "../../lib/squirrels";
import SquirrelCard from "./SquirrelCard";
import styles from "./squirrels.module.css";

export default function SquirrelList() {
  return (
    <section className={styles.listContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Squirrel Forest</h1>
        <p className={styles.subtitle}>
          Meet our squirrels and help them prepare for the winter! Each nut you
          feed them will decrease their current stock status.
        </p>
      </header>

      <div className={styles.grid}>
        {squirrels.map((squirrel) => (
          <SquirrelCard key={squirrel.id} squirrel={squirrel} />
        ))}
      </div>
    </section>
  );
}
