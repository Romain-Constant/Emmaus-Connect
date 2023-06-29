import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./DbPhonePage.module.css";
import { convertDate } from "../components/phonesTable/dateUtils";

function DbPhonePage() {
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

  return (
    <div className={styles.DbPhonePageContainer}>
      <div className={styles.filterSideBarContainer}>
        <div className={styles.sidebarTitleContainer}>Filtrer</div>
      </div>
      <div className={styles.phonesTableAndTitleContainer}>
        <div className={styles.phonesTableTitle}>Liste des téléphones</div>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <div className={styles.headerColorBloc} />
              <th className={styles.theadRow}>Marque</th>
              <th className={styles.theadRow}>Modèle</th>
              <th className={styles.theadRow}>Catégorie</th>
              <th className={styles.theadRow}>Prix</th>
              <th className={styles.theadRow}>Ajouté le</th>
              <th className={styles.theadRow}>Détails</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <tr className={styles.bodyRows} key={phone.id}>
                <div
                  className={`${styles.colorBloc} ${
                    styles[`category${phone.category_id}`]
                  }`}
                />
                <td className={styles.rows}>{phone.brand}</td>
                <td className={styles.rows}>{phone.model}</td>
                <td className={styles.rows}>{phone.category}</td>
                <td className={styles.rows}>{phone.price}</td>
                <td className={styles.rows}>
                  {convertDate(phone.addition_date)}
                </td>
                <td className={styles.rows}>
                  <Link to={`/utilisateur/bddtelephones/infos/${phone.id}`}>
                    <FaEye className={styles.eyeIcon} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DbPhonePage;
