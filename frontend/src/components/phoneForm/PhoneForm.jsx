import { useState } from "react";
import styles from "./PhoneForm.module.css";

export default function PhoneForm() {
  const [identificationMethod, setIdentificationMethod] = useState(null);
  const [phoneInput, setPhoneInput] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPhoneInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  if (!identificationMethod)
    return (
      <div className={styles.phoneFormContainer}>
        <h1 className={styles.phoneFormText}>
          Commencer l’enregistrement de nouveaux téléphones
        </h1>
        <div className={styles.identificationButtonContainer}>
          <button
            type="button"
            onClick={() => setIdentificationMethod("automatique")}
          >
            Identification automatique
          </button>
          <button
            type="button"
            onClick={() => setIdentificationMethod("manuelle")}
          >
            Identification manuelle
          </button>
        </div>
      </div>
    );
  if (identificationMethod === "automatique")
    return (
      <div className={styles.phoneFormContainer}>
        <h1 className={styles.phoneFormText}>Indisponible pour le moment</h1>
      </div>
    );

  /*   `center_id`, `user_id`, `status_id`, `category_id`, `imei`, `brand`,
     `model`, `memory`, `storage`, `network`, `service_date`, `addition_date`,
      `phone_condition`, `image1`, `image2`, `image3`, `price` 
      
      TODO 
      center_id need to be set before in insert, then in the forms select with the existing centers by axios fetch 
      user_id need to be get from the params
      status_id need to be created before insert in back 
      category_id need to be attribitued by algorithm in the back (HC, A, C etc...) 
      addition_date need to be attributed in the back by getting the current date */

  if (identificationMethod === "manuelle") {
    const labels = [
      { name: "imei", placeholder: "Ex : 123456789111111", label: "IMEI" },
      { name: "brand", placeholder: "Ex : Apple", label: "Marque" },
      { name: "model", placeholder: "Ex : iphone5", label: "Modèle" },
      { name: "memory", placeholder: "Ex : 16GB", label: "Mémoire" },
      { name: "storage", placeholder: "Ex : 256GB", label: "Stockage" },
      { name: "network", label: "Réseau", options: ["3G", "4G", "5G"] },
      {
        name: "service_date",
        placeholder: "Ex : YYYY-MM-DD",
        label: "Mise en service",
      },
      {
        name: "phone_condition",
        label: "Etat",
        options: [
          "Dee",
          "Réparable",
          "Bloqué",
          "Reconditionnable",
          "Reconditionné",
        ],
      },
      { name: "image1", placeholder: "Ex : URL", label: "Image 1" },
      { name: "image2", placeholder: "Ex : URL", label: "Image 2" },
      { name: "image3", placeholder: "Ex : URL", label: "Image 3" },
    ];

    return (
      <div className={styles.phoneFormContainer}>
        <h1 className={styles.phoneFormText}>
          Remplissez les champs ci-dessous pour ajouter un téléphone
        </h1>
        <form onSubmit={handleSubmit}>
          {labels.map((label) => {
            if (label.name === "phone_condition") {
              return (
                <label key={label.name} className={styles.phoneLabelContainer}>
                  {label.label}
                  <select
                    required
                    name={label.name}
                    value={phoneInput[label.name] || ""}
                    onChange={handleChange}
                  >
                    <option value=""> </option>
                    {label.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            if (label.name === "network") {
              return (
                <label key={label.name} className={styles.phoneLabelContainer}>
                  {label.label}
                  <select
                    required
                    name={label.name}
                    value={phoneInput[label.name] || ""}
                    onChange={handleChange}
                  >
                    <option value=""> </option>
                    {label.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            return (
              <label key={label.name} className={styles.phoneLabelContainer}>
                {label.label}
                <input
                  required
                  type="text"
                  name={label.name}
                  placeholder={label.placeholder}
                  value={phoneInput[label.name] || ""}
                  onChange={handleChange}
                />
              </label>
            );
          })}
          <button type="submit" className={styles.phoneValidateButton}>
            Confirmer
          </button>
        </form>
      </div>
    );
  }
}
