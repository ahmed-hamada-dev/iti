import { useState } from "react";
import { useRouter } from "next/router";
import type { Squirrel } from "../../lib/squirrels";
import styles from "./squirrels.module.css";
import Image from "next/image";
import Link from "next/link";

interface SquirrelCardProps {
  squirrel: Squirrel;
}

export default function SquirrelCard({ squirrel }: SquirrelCardProps) {
  const [count, setCount] = useState(squirrel.count);
  const router = useRouter();

  const handleFeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (count > 0) {
      setCount((c) => c - 1);
    }
  };

  const getStatusColor = () => {
    if (count === 0) return "var(--text-muted)";
    if (count === 1) return "#ef4444";
    if (count < 5) return "#f59e0b";
    return "var(--accent)";
  };

  return (
    <Link
      href={`/squirrels/${squirrel.id}`}
      className={`${styles.card} fade-in`}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageWrapper}>
        <Image
          width={500}
          height={500}
          src={squirrel.image}
          alt={squirrel.name}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.typeBadge}>{squirrel.type}</span>
      </div>

      <div className={styles.content}>
        <h3>{squirrel.name}</h3>
        <p className={styles.description}>{squirrel.description}</p>

        <div className={styles.statsRow}>
          <span className={styles.countLabel}>Stock Status</span>
          <span
            className={styles.countValue}
            style={{ color: getStatusColor() }}
          >
            {count} {count === 1 ? "Nut" : "Nuts"}
          </span>
        </div>

        <button
          className={styles.feedButton}
          onClick={(e) => {
            handleFeed(e);
            e.preventDefault();
          }}
          disabled={count === 0}
        >
          {count === 0 ? "Out of Nuts!" : "Feed Nut"}
        </button>
      </div>
    </Link>
  );
}
