import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./PhoneForm.module.css";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function PhoneForm() {
  const [phoneInput, setPhoneInput] = useState({});
  const [center, setCenter] = useState([]);
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function getRandomNumber(min, max) {
    const randomDecimal = Math.random();
    const randomInteger = Math.ceil(randomDecimal * (max - min + 1));
    const result = randomInteger + min - 1;
    return result;
  }

  const FetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/center`);
      setCenter(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const pushImgtoDB = async () => {
    try {
      const formData = new FormData();
      formData.append("phoneimg", inputRef1.current.files[0]);
      formData.append("phoneimg", inputRef2.current.files[0]);
      formData.append("phoneimg", inputRef3.current.files[0]);
      const response = await axios.post(
        `http://localhost:5000/uploadimg`,
        formData
      );
      console.info(response);
      // if (response.statusText === "OK") {
      //   console.info("img send");
      // }
    } catch (error) {
      console.error(error);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phoneInput.center) {
      console.error("Center not selected");
      return;
    }

    try {
      const result = await axios.get(
        `http://localhost:5000/center/${phoneInput.center}`
      );
      const centerId = result.data.id;
      const statusResponse = await axios.post("http://localhost:5000/status", {
        user_id: currentUser?.user_id,
      });
      const { statusId } = statusResponse.data;

      const inputData = {
        center_id: centerId,
        user_id: currentUser?.user_id,
        status_id: statusId,
        category_id: getRandomNumber(1, 5),
        price: getRandomNumber(1, 600),
        ...phoneInput,
      };

      const response = await axios.post(
        "http://localhost:5000/phone",
        inputData
      );
      if (response.statusText === "OK") {
        await pushImgtoDB();
        console.log(response);
        navigate("/utilisateur/bddtelephones/infos/:id");
        window.alert("Téléphone ajouté");
      }
    } catch (error) {
      if (error.response.status === 500) {
        window.alert(error.response.data);
      }
    }
  };

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
