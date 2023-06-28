import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./PhonesTable.module.css";

function PhonesTable() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fectchAllPhones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/phone");
        setPhones(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPhones();
  }, []);

  console.log(phones);

  return (
    <div className={styles.phonesTableAndTitleContainer}>
      <div className={styles.phonesTableTitle}>Liste des téléphones</div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.theadRow}>Marque</th>
            <th className={styles.theadRow}>Modèle</th>
            <th className={styles.theadRow}>Catégorie</th>
            <th className={styles.theadRow}>Prix</th>
            <th className={styles.theadRow}>Ajouté le</th>
            <th className={styles.theadRow}>Détails</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.bodyRows} key="test">
            <td className={styles.rows}>test</td>
            <td className={styles.rows}>test</td>
            <td className={styles.rows}>test</td>
            <td className={styles.rows}>test</td>
            <td className={styles.rows}>test</td>
            <td className={styles.rows}>
              <Link to="/secretariat/patient/infos/">
                <FaEye className={styles.eyeIcon} />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PhonesTable;
