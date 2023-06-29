import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./PhoneForm.module.css";

export default function PhoneForm() {
  const [phoneInput, setPhoneInput] = useState({});
  const [center, setCenter] = useState([]);
  const FetchData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/center");
      console.info(result.data);
      setCenter(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "imei") {
      if (value.length > 15) {
        return;
      }
    }
    setPhoneInput((values) => ({ ...values, [name]: value }));
  };

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPhoneInput((values) => ({
      ...values,
      image1: inputRef1.current.files[0],
      image2: inputRef2.current.files[0],
      image3: inputRef3.current.files[0],
      center_id: 1,
      user_id: 1,
      status_id: 1,
      category_id: 1,
    }));
    try {
      console.info(phoneInput);
      const formData = new FormData();
      formData.append("phoneimg", inputRef1.current.files[0]);
      formData.append("phoneimg", inputRef2.current.files[0]);
      formData.append("phoneimg", inputRef3.current.files[0]);
      const response = await axios.post(
        "http://localhost:5000/phone/uploadimg",
        formData
      );
      console.info(response);
    } catch (error) {
      console.error(error);
    }
  };

  /*   `center_id`, `user_id`, `status_id`, `category_id`, `imei`, `brand`,
     `model`, `memory`, `storage`, `network`, `service_date`, `addition_date`,
      `phone_condition`, `image1`, `image2`, `image3`, `price` 
      
      TODO 
      center_id need to be set before in insert, then in the forms select with the existing centers by axios fetch 
      user_id need to be get from the params
      status_id need to be created before insert in back 
      category_id need to be attribitued by algorithm in the back (HC, A, C etc...) 
      addition_date need to be attributed in the back by getting the current date */

  const labels = [
    {
      name: "imei",
      placeholder: "Ex : 123456789111111",
      label: "IMEI",
      type: "number",
    },
    { name: "brand", placeholder: "Ex : Apple", label: "Marque", type: "text" },
    {
      name: "model",
      placeholder: "Ex : iphone5",
      label: "Modèle",
      type: "text",
    },
    {
      name: "memory",
      placeholder: "Ex : 16",
      label: "Mémoire (GB)",
      type: "number",
    },
    {
      name: "storage",
      placeholder: "Ex : 256",
      label: "Stockage (GB)",
      type: "number",
    },
    { name: "network", label: "Réseau", options: ["3G", "4G", "5G"] },
    //  TODO fetch center from back to make options
    {
      name: "center",
      label: "Centre",
      options: center.map(({ city }) => {
        return `${city}`;
      }),
    },

    {
      name: "service_date",
      placeholder: "Ex : YYYY-MM-DD",
      label: "Mise en service",
      type: "date",
    },
    {
      name: "phone_condition",
      label: "État",
      options: [
        "Dee",
        "Réparable",
        "Bloqué",
        "Reconditionnable",
        "Reconditionné",
      ],
    },
    {
      name: "image1",
      placeholder: "Ex : URL",
      label: "Image 1",
      type: "file",
      ref: inputRef1,
    },
    {
      name: "image2",
      placeholder: "Ex : URL",
      label: "Image 2",
      type: "file",
      ref: inputRef2,
    },
    {
      name: "image3",
      placeholder: "Ex : URL",
      label: "Image 3",
      type: "file",
      ref: inputRef3,
    },
  ];

  return (
    <div className={styles.phoneFormContainer}>
      <h1 className={styles.phoneFormText}>
        Remplissez les champs ci-dessous pour ajouter un téléphone
      </h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        {labels.map((label) => {
          if (
            label.name === "network" ||
            label.name === "phone_condition" ||
            label.name === "center"
          ) {
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
          if (label.name.includes("image")) {
            return (
              <label
                htmlFor="file"
                key={label.name}
                className={`${styles.phoneLabelContainer} ${styles.labelFile}`}
              >
                {label.label}
                <input
                  id="file"
                  className={styles.inputFile}
                  name={label.name}
                  type={label.type}
                  ref={label.ref}
                  onChange={() => {
                    setPhoneInput((values) => ({
                      ...values,
                      image1: inputRef1.current.files[0],
                    }));
                  }}
                />
              </label>
            );
          }
          return (
            <label key={label.name} className={styles.phoneLabelContainer}>
              {label.label}
              <input
                required
                type={label.type}
                name={label.name}
                placeholder={label.placeholder}
                value={phoneInput[label.name] || ""}
                onChange={handleChange}
                min="0"
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
