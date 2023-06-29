import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/emmaus-connect-logo.svg";
import ConnexionForm from "../components/connexionForm/ConnexionForm";
import Footer from "../components/footer/Footer";
import styles from "./Connexion.module.css";

function Connexion() {
  return (
    <div className={styles.connexionContainer}>
      <nav className={styles.navbarContainer}>
        <Link to="/" className={styles.linkContainer}>
          <div className={styles.emmausLogoContainer}>
            <img className={styles.logo} src={logo} alt="emmaus connect logo" />
          </div>
        </Link>
      </nav>
      <section className={styles.pageContainer}>
        <ConnexionForm />
      </section>
      <Footer />
    </div>
  );
}

export default Connexion;
