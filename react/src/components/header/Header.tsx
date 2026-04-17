import { Link } from "@tanstack/react-router";
import { navLinks } from "#/lib/constants";
import styles from "./header.module.css";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Squirrel<span>World</span>
        </Link>
        <nav className={styles.nav}>
          {
            navLinks.map((link, index) => (
              <Link key={index} to={link.to} activeProps={{ className: styles.active }}>{link.label}</Link>
            ))
          }
        </nav>
      </div>
    </header>
  );
}

