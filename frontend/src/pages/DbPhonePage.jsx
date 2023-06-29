import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./DbPhonePage.module.css";
import { convertDate } from "../components/phonesTable/dateUtils";

function DbPhonePage() {
  const [phones, setPhones] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(["À vendre"]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchAllPhones = async () => {
      try {
        const phonesResponse = await axios.get("http://localhost:5000/phone");
        setPhones(phonesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllPhones();
  }, []);

  const filteredPhones = phones.filter(
    (phone) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(phone.category)) &&
      (selectedStatus.length === 0 || selectedStatus.includes(phone.status))
  );
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleStatusChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleRowSelect = (phoneId) => {
    if (selectedRows.includes(phoneId)) {
      setSelectedRows(selectedRows.filter((id) => id !== phoneId));
    } else {
      if (selectedRows.length < 2) {
        setSelectedRows([...selectedRows, phoneId]);
      }
    }
  };

  return (
    <div className={styles.DbPhonePageContainer}>
      <div className={styles.filterSideBarContainer}>
        <div className={styles.categoryFilterContainer}>
          <div>
            <div className={styles.filterCategName}>Disponibilité</div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="statusForSale"
              checked={selectedStatus.includes("À vendre")}
              onChange={() => handleStatusChange("À vendre")}
            />
            <label htmlFor="statusForSale">À vendre</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="statusNotAvailable"
              checked={selectedStatus.includes("Non disponible")}
              onChange={() => handleStatusChange("Non disponible")}
            />
            <label htmlFor="statusNotAvailable">Non disponible</label>
          </div>
        </div>
        <div className={styles.categoryFilterContainer}>
          <div>
            <div className={styles.filterCategName}>Catégorie</div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="categoryHC"
              checked={selectedCategories.includes("HC")}
              onChange={() => handleCategoryChange("HC")}
            />
            <label htmlFor="categoryHC">HC</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="categoryC"
              checked={selectedCategories.includes("C")}
              onChange={() => handleCategoryChange("C")}
            />
            <label htmlFor="categoryC">C</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="categoryB"
              checked={selectedCategories.includes("B")}
              onChange={() => handleCategoryChange("B")}
            />
            <label htmlFor="categoryB">B</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="categoryA"
              checked={selectedCategories.includes("A")}
              onChange={() => handleCategoryChange("A")}
            />
            <label htmlFor="categoryA">A</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="categoryPremium"
              checked={selectedCategories.includes("Premium")}
              onChange={() => handleCategoryChange("Premium")}
            />
            <label htmlFor="categoryPremium">Premium</label>
          </div>
        </div>
      </div>
      <div className={styles.phonesTableAndTitleContainer}>
        <div className={styles.phonesTableTitle}>Liste des téléphones</div>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <div className={styles.headerColorBloc} />
              <th className={styles.theadRow}>Selectionner</th>
              <th className={styles.theadRow}>Marque</th>
              <th className={styles.theadRow}>Modèle</th>
              <th className={styles.theadRow}>Catégorie</th>
              <th className={styles.theadRow}>Prix</th>
              <th className={styles.theadRow}>Ajouté le</th>
              <th className={styles.theadRow}>Détails</th>
            </tr>
          </thead>
          <tbody>
            {filteredPhones.map((phone) => (
              <tr className={styles.bodyRows} key={phone.id}>
                <div
                  className={`${styles.colorBloc} ${
                    styles[`category${phone.category_id}`]
                  }`}
                />
                <td className={`${styles.checkboxCell} ${styles.rows}`}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(phone.id)}
                    onChange={() => handleRowSelect(phone.id)}
                    disabled={
                      selectedRows.length >= 2 &&
                      !selectedRows.includes(phone.id)
                    }
                  />
                </td>
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
