import { Link } from "@tanstack/react-router";
import { navLinks } from "#/lib/constants";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Squirrel<span>World</span></h3>
            <p>Advocating for the clever gardeners of our forests.</p>
          </div>
          <div className={styles.links}>
            <h4>Explore</h4>
            <nav className={styles.navStack}>
              {navLinks.map((link, index) => (
                <Link key={index} to={link.to}>{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {currentYear} Squirrel World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
