import React from "react";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/emmaus-connect-logo.svg";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.mainLayoutContainer}>
      <nav className={styles.navbarContainer}>
        <Link to="/" className={styles.linkContainer}>
          <div className={styles.emmausLogoContainer}>
            <img className={styles.logo} src={logo} alt="emmaus connect logo" />
          </div>
        </Link>
        <div className={styles.navMenuContainer}>
          <div className={styles.navMenuList}>
            <NavLink
              to="/utilisateur/nouveautelephone"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.pendingLink
              }
            >
              Ajouter un téléphone
              <div className={styles.underline} />
            </NavLink>
            <NavLink
              to="/utilisateur/bddtelephones"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.pendingLink
              }
            >
              Liste des téléphones
              <div className={styles.underline} />
            </NavLink>
            <NavLink
              to="/utilisateur/faq"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.pendingLink
              }
            >
              F.A.Q
              <div className={styles.underline} />
            </NavLink>
          </div>
        </div>
        <div className={styles.userInfos}>
          <FaUserAlt className={styles.userIcon} />
          <h2 className={styles.username}>John Doe</h2>
          <FaSignOutAlt className={styles.userIcon} />
        </div>
      </nav>
      <section>
        <Outlet />
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

export default MainLayout;
