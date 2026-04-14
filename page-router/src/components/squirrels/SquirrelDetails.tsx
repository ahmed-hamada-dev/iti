import { useRouter } from "next/router";
import type { Squirrel } from "../../lib/squirrels";
import styles from "./squirrel-details.module.css";
import Image from "next/image";

interface SquirrelDetailsProps {
  squirrel: Squirrel;
}

export default function SquirrelDetails({ squirrel }: SquirrelDetailsProps) {
  const router = useRouter();

  return (
    <article className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          width={500}
          height={500}
          src={squirrel.image}
          alt={squirrel.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{squirrel.name}</h1>
        <span className={styles.typeBadge}>
          {squirrel.type} Squirrel
        </span>
        
        <p className={styles.description}>{squirrel.description}</p>
        
        <div className={styles.stockContainer}>
          <div>
            <div className={styles.stockLabel}>Availability</div>
            <div className={`${styles.stockValue} ${squirrel.count > 0 ? styles.inStock : styles.outOfStock}`}>
              {squirrel.count} {squirrel.count === 1 ? 'Nut' : 'Nuts'} Remaining
            </div>
          </div>
        </div>
        
        <button 
          className={styles.backButton}
          onClick={() => router.back()}
        >
          &larr; Back to Forest
        </button>
      </div>
    </article>
  );
}
