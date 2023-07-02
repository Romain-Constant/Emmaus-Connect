import React from "react";
import styles from "./FaqPage.module.css";

function FaqPage() {
  return (
    <div className={styles.FaqPageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.messageContainer}>
          <h1 className={styles.message}>La F.A.Q arrive bientôt...</h1>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
