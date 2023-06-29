import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import styles from "./ComparePhones.module.css";

function ComparePhones() {
  const { id1, id2 } = useParams();
  const [phone1, setPhone1] = useState({});
  const [phone2, setPhone2] = useState({});

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const phone1Response = await axios.get(
          `http://localhost:5000/phone/${id1}`
        );
        setPhone1(phone1Response.data);

        const phone2Response = await axios.get(
          `http://localhost:5000/phone/${id2}`
        );
        setPhone2(phone2Response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhones();
  }, [id1, id2]);

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
    <div className={styles.comparePhonesPage}>
      <div className={styles.phonesContainer}>
        <div className={styles.compareTitle}>
          COMPARATEUR
          <Link
            className={styles.linkContainer}
            to="/utilisateur/bddtelephones"
          >
            <FaRegCircleXmark className={styles.crossIcon} />
          </Link>
        </div>

        <div className={styles.leftAndRightContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Marque</h2>
              <h1 className={styles.specsDesc}>{phone1.brand}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Modèle</h2>
              <h1 className={styles.specsDesc}>{phone1.model}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Mémoire (GB)</h2>
              <h1 className={styles.specsDesc}>{phone1.memory}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Stockage (GB)</h2>
              <h1 className={styles.specsDesc}>{phone1.storage}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Réseau</h2>
              <h1 className={styles.specsDesc}>{phone1.network}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>État</h2>
              <h1 className={styles.specsDesc}>{phone1.phone_condition}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Prix</h2>
              <h1
                className={`${styles.price} ${getPriceColorClass(
                  phone1.category
                )}`}
              >
                {phone1.price}€
              </h1>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Marque</h2>
              <h1 className={styles.specsDesc}>{phone2.brand}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Modèle</h2>
              <h1 className={styles.specsDesc}>{phone2.model}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Mémoire (GB)</h2>
              <h1 className={styles.specsDesc}>{phone2.memory}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Stockage (GB)</h2>
              <h1 className={styles.specsDesc}>{phone2.storage}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Réseau</h2>
              <h1 className={styles.specsDesc}>{phone2.network}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>État</h2>
              <h1 className={styles.specsDesc}>{phone2.phone_condition}</h1>
            </div>
            <div className={styles.separator} />
            <div className={styles.descBloc}>
              <h2 className={styles.specsTitle}>Prix</h2>
              <h1
                className={`${styles.price} ${getPriceColorClass(
                  phone2.category
                )}`}
              >
                {phone2.price}€
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparePhones;
