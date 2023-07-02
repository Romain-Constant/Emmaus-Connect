import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import iphonePhoto from "../assets/iphone-model.jpeg";
import styles from "./InfosPhonePage.module.css";

function InfosPhonePage() {
  const [phone, setPhone] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const phoneResponse = await axios.get(
          `http://localhost:5000/phone/${id}`
        );
        setPhone(phoneResponse.data);
        setSelectedStatus(phoneResponse.data.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhones();
  }, []);

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

  const updateStatus = async () => {
    let statutToSend = "";
    if (selectedStatus === "À vendre") {
      statutToSend = 0;
    } else {
      statutToSend = 1;
    }

    try {
      await axios.put(`http://localhost:5000/status/${phone.status_id}`, {
        disponibility: statutToSend,
        user_id: phone.user_id,
      });

      // Optionnel : Effectuer une action après la mise à jour du statut, comme afficher un message de succès.
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (event) => {
    setSelectedStatus(event.target.value);
    await updateStatus(); // Appel de la fonction updateStatus après la mise à jour du statut
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
              <h2 className={styles.specsTitle}>Site</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>N° IMEI</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Prix</h2>
              <div className={styles.separator} />
              <h2 className={styles.specsTitle}>Disponibilité</h2>
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
              <h1 className={styles.specsDesc}>{phone.center_city}</h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>{phone.imei}</h1>
              <div className={styles.separator} />
              <h1
                className={`${styles.price} ${getPriceColorClass(
                  phone.category
                )}`}
              >
                {phone.price}€
              </h1>
              <div className={styles.separator} />
              <h1 className={styles.specsDesc}>
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className={styles.statusSelect}
                >
                  <option value="À vendre">À vendre</option>
                  <option value="Non disponible">Non disponible</option>
                </select>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfosPhonePage;
