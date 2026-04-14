import Link from "next/link";
import styles from "./header.module.css";
import { navLinks, squirrelStrategies } from "@/lib/constants";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            Squirrel<span>World</span>
          </Link>
          <nav className={styles.nav}>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.to}
                className={currentPath === link.to ? styles.active : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className={styles.strategyRow}>
        <div className={styles.container}>
          <div className={styles.strategyNav}>
            <span className={styles.strategyLabel}>Strategies:</span>
            {squirrelStrategies.map((strategy) => (
              <Link
                key={strategy.href}
                href={strategy.href}
                className={`${styles.strategyLink} ${
                  currentPath === strategy.href ? styles.strategyActive : ""
                }`}
              >
                <span className={styles.strategyBadge} style={{ backgroundColor: `var(--${strategy.name.toLowerCase()}-color, ${strategy.color.replace('bg-', '')})` }}></span>
                {strategy.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
