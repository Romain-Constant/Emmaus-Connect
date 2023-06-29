import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import iphonePhoto from "../assets/iphone-model.jpeg";
import styles from "./InfosPhonePage.module.css";
import { FaRegCircleXmark } from "react-icons/fa6";

function InfosPhonePage() {
  const [phone, setPhone] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const phoneResponse = await axios.get(
          `http://localhost:5000/phone/${id}`
        );
        setPhone(phoneResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhones();
  });

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
    <div className={styles.infosPhonePageContainer}>
      <div className={styles.phoneInfoContainer}>
        <div className={styles.phoneTitleContainer}>
          <h1>{`${phone.brand} ${phone.model}`}</h1>
          <Link
            className={styles.linkContainer}
            to="/utilisateur/bddtelephones"
          >
            <FaRegCircleXmark className={styles.crossIcon} />
          </Link>
        </div>
        <div className={styles.leftAndRightContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.phonePhotosContainer}>
              <img src={iphonePhoto} alt="" />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.right1}>
              <h2 className={styles.specsTitle}>Marque</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Modèle</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Mémoire (GB)</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Stockage (GB)</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Réseau</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>État</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Prix</h2>
            </div>
            <div className={styles.right2}>
              <h1 className={styles.specsDesc}>{phone.brand}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.model}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.memory}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.storage}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.network}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.phone_condition}</h1>
              <div className={styles.separator} />
              <h1
                className={`${styles.price} ${getPriceColorClass(
                  phone.category
                )}`}
              >
                {phone.price}€
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfosPhonePage;
