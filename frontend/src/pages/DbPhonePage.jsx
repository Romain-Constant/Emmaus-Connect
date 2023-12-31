import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { convertDate } from "../components/phonesTable/dateUtils";
import styles from "./DbPhonePage.module.css";

function DbPhonePage() {
  const [phones, setPhones] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(["À vendre"]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
      (selectedStatus.length === 0 || selectedStatus.includes(phone.status)) &&
      (selectedCity.length === 0 || selectedCity.includes(phone.center_city))
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

  const handleCityChange = (status) => {
    if (selectedCity.includes(status)) {
      setSelectedCity(selectedCity.filter((s) => s !== status));
    } else {
      setSelectedCity([...selectedCity, status]);
    }
  };

  const handleRowSelect = (phoneId) => {
    if (selectedRows.includes(phoneId)) {
      setSelectedRows(selectedRows.filter((id) => id !== phoneId));
    } else if (selectedRows.length < 2) {
      setSelectedRows([...selectedRows, phoneId]);
    }
  };

  const handleButtonClick = () => {
    const [phoneId1, phoneId2] = selectedRows;
    navigate(`/utilisateur/bddtelephones/compare/${phoneId1}/${phoneId2}`);
  };

  const getPriceColorClass = (category) => {
    switch (category) {
      case "HC":
        return styles.blue;
      case "C":
        return styles.green;
      case "B":
        return styles.yellow;
      case "A":
        return styles.orange;
      case "Premium":
        return styles.red;
      default:
        return "";
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
        <div className={styles.categoryFilterContainer}>
          <div>
            <div
              className={`${styles.filterCategName} ${styles.localisationTitle}`}
            >
              Localisation
            </div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cityLille"
              checked={selectedCity.includes("Lille")}
              onChange={() => handleCityChange("Lille")}
            />
            <label htmlFor="cityLille">Lille</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cityParis"
              checked={selectedCity.includes("Paris")}
              onChange={() => handleCityChange("Paris")}
            />
            <label htmlFor="cityParis">Paris</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cityLyon"
              checked={selectedCity.includes("Lyon")}
              onChange={() => handleCityChange("Lyon")}
            />
            <label htmlFor="cityLyon">Lyon</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cityMarseille"
              checked={selectedCity.includes("Marseille")}
              onChange={() => handleCityChange("Marseille")}
            />
            <label htmlFor="cityMarseille">Marseille</label>
          </div>
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cityStrasbourg"
              checked={selectedCity.includes("Strasbourg")}
              onChange={() => handleCityChange("Strasbourg")}
            />
            <label htmlFor="cityStrasbourg">Strasbourg</label>
          </div>
        </div>
      </div>
      <div className={styles.phonesTableAndTitleContainer}>
        <div className={styles.tableTitleAndButton}>
          <div className={styles.phonesTableTitle}>Liste des téléphones</div>
          <button
            type="button"
            className={styles.compareButton}
            onClick={handleButtonClick}
            disabled={selectedRows.length !== 2}
          >
            Comparateur
          </button>
          <FaRegCircleQuestion
            className={styles.interrogationIcon}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className={styles.parentTableContainer}>
          <table className={styles.tableContainer}>
            <thead>
              <tr className={styles.trBloc}>
                {/* <div className={styles.headerColorBloc} /> */}
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
                  {/*  <div
                    className={`${styles.colorBloc} ${
                      styles[`category${phone.category_id}`]
                    }`}
                  /> */}
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
                  <td
                    className={`${styles.rows} ${getPriceColorClass(
                      phone.category
                    )}`}
                  >
                    {phone.price}€
                  </td>
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
      {isHovered && (
        <div className={styles.hoverMessage}>
          <h3 className={styles.modalMessage}>
            Veuillez sélectionner deux téléphones afin de pouvoir lancer le
            comparatif.
          </h3>
        </div>
      )}
    </div>
  );
}

export default DbPhonePage;
