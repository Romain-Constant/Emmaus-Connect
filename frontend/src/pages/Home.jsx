import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.text}>
            Vous souhaitez estimer le prix d'un{" "}
            <span className={styles.greenColor}>téléphone reconditionné</span> ?
          </h1>
          <h2 className={styles.textLittle}>
            Spécifiez les critères de votre appareil et obtenez une{" "}
            <span className={styles.redColor}>estimation immédiate.</span>
          </h2>
          <div className={styles.buttonContainer}>
            <Link to="/utilisateur/nouveautelephone">
              <button className={styles.addPhone}>Ajouter un téléphone</button>
            </Link>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h1 className={styles.text}>
            Vous voulez connaitre les{" "}
            <span className={styles.redBigColor}>disponibilités </span>
            dans votre centre ?
          </h1>
          <h2 className={styles.textLittle}>
            Accédez à notre base de données
            <span className={styles.greenLittleColor}> en ligne.</span>
          </h2>
          <div className={styles.buttonContainer}>
            <Link to="/utilisateur/bddtelephones">
              <button className={styles.addPhoneOrange}>
                Liste de téléphones
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
