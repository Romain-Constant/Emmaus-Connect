import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <ul className={styles.listContainer}>
        <li>Mentions légales</li>
        <li>Politique de confidentialité</li>
        <li>Emmaûs Connect avec LaCollecte.tech</li>
      </ul>
    </footer>
  );
}

export default Footer;
