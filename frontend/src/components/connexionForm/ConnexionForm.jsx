import React, { useState } from "react";
import styles from "./ConnexionForm.module.css";
import logo from "../../assets/emmaus-small-logo.svg";

function ConnexionForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.connexionFormContainer}>
      <div className={styles.imageContainer}>
        <h1 className={styles.welcomeText}>
          Bienvenue sur votre page de connexion
        </h1>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className={styles.labelContainer}>
            EMAIL
            <input
              type="text"
              name="email"
              placeholder="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </label>
          <label className={styles.labelContainer}>
            MOT DE PASSE
            <input
              type="password"
              name="password"
              placeholder="mot de passe"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.connexionButton}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConnexionForm;
