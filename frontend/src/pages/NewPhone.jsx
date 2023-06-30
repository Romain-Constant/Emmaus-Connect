import React from "react";
import styles from "./NewPhone.module.css";
import PhoneForm from "../components/phoneForm/PhoneForm";

function NewPhone() {
  return (
    <div className={styles.newPhoneContainer}>
      <PhoneForm />
    </div>
  );
}

export default NewPhone;
