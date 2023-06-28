import React, { useState } from "react";
import styles from "./ConnexionForm.module.css";
import logo from "../../assets/emmaus-connect-logo.svg";

function ConnexionForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };
  return (
    <div className={styles.connexionFormContainer}>
      <div className={styles.imageContainer}></div>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className={styles.labelContainer}>
            Entrez votre email:
            <input
              type="text"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </label>
          <label className={styles.labelContainer}>
            Entrez votre mot de passe:
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ConnexionForm;
