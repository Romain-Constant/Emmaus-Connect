import React from "react";
import styles from "./Connexion.module.css";
import logo from "../assets/emmaus-connect-logo.svg";
import ConnexionForm from "../components/connexionForm/ConnexionForm";

function Connexion() {
  return (
    <div className={styles.connexionContainer}>
      <nav className={styles.navbarContainer}>
        <div className={styles.emmausLogoContainer}>
          <img className={styles.logo} src={logo} alt="emmaus connect logo" />
        </div>
        <button type="button" className={styles.connexionButton}>
          Se connecter
        </button>
      </nav>
      <section className={styles.pageContainer}>
        <ConnexionForm />
      </section>
      <footer className={styles.footerContainer}>
        <ul className={styles.listContainer}>
          <li>Mentions légales</li>
          <li>Politique de confidentialité</li>
          <li>Emmaûs Connect avec LaCollecte.tech</li>
        </ul>
      </footer>
    </div>
  );
}

export default Connexion;
