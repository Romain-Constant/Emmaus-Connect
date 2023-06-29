import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./PhonesTable.module.css";
import { convertDate } from "./dateUtils";

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

  /* const phones = [
    {
      id: 1,
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 1,
      imei: "123456789012345",
      brand: "Brand1",
      model: "Model1",
      memory: "4GB",
      storage: "64GB",
      network: "4G",
      service_date: "2023-06-27T22:00:00.000Z",
      addition_date: "2023-06-28T18:02:59.000Z",
      phone_condition: "Dee",
      image1: "image1.jpg",
      image2: "image2.jpg",
      image3: "image3.jpg",
      price: "100",
    },
    {
      id: 2,
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 2,
      imei: "123456789012345",
      brand: "Brand1",
      model: "Model1",
      memory: "4GB",
      storage: "64GB",
      network: "4G",
      service_date: "2023-06-27T22:00:00.000Z",
      addition_date: "2023-06-28T18:02:59.000Z",
      phone_condition: "Dee",
      image1: "image1.jpg",
      image2: "image2.jpg",
      image3: "image3.jpg",
      price: "100",
    },
    {
      id: 3,
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 3,
      imei: "123456789012345",
      brand: "Brand1",
      model: "Model1",
      memory: "4GB",
      storage: "64GB",
      network: "4G",
      service_date: "2023-06-27T22:00:00.000Z",
      addition_date: "2023-06-28T18:02:59.000Z",
      phone_condition: "Dee",
      image1: "image1.jpg",
      image2: "image2.jpg",
      image3: "image3.jpg",
      price: "100",
    },
    {
      id: 4,
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 4,
      imei: "123456789012345",
      brand: "Brand1",
      model: "Model1",
      memory: "4GB",
      storage: "64GB",
      network: "4G",
      service_date: "2023-06-27T22:00:00.000Z",
      addition_date: "2023-06-28T18:02:59.000Z",
      phone_condition: "Dee",
      image1: "image1.jpg",
      image2: "image2.jpg",
      image3: "image3.jpg",
      price: "100",
    },
    {
      id: 5,
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 3,
      imei: "123456789012345",
      brand: "Brand1",
      model: "Model1",
      memory: "4GB",
      storage: "64GB",
      network: "4G",
      service_date: "2023-06-27T22:00:00.000Z",
      addition_date: "2023-06-28T18:02:59.000Z",
      phone_condition: "Dee",
      image1: "image1.jpg",
      image2: "image2.jpg",
      image3: "image3.jpg",
      price: "100",
    },
  ]; */

  return (
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
  );
}

export default PhonesTable;
