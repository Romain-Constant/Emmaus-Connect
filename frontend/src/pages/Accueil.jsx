import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/emmaus-connect-logo.svg";
import styles from "./Accueil.module.css";
import Footer from "../components/footer/Footer";

function Accueil() {
  return (
    <div className={styles.accueilContainer}>
      <nav className={styles.navbarContainer}>
        <Link to="/" className={styles.linkContainer}>
          <div className={styles.emmausLogoContainer}>
            <img className={styles.logo} src={logo} alt="emmaus connect logo" />
          </div>
        </Link>
        <Link to="/connexion">
          <button type="button" className={styles.connexionButton}>
            Se connecter
          </button>
        </Link>
      </nav>
      <Footer />
    </div>
  );
}

export default Accueil;
