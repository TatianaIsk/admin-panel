import styles from "./CreateUser.module.scss";

import { useState } from "react";
import { useTheme } from "../../../../ThemeContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../../store.jsx";
import axios from "axios";
import classnames from "classnames";

const CreateUser = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    website: "",
    phone: "",
    zipcode: "",
    city: "",
    street: "",
    nameComp: "",
    catchPhrase: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        value
      );
      setEmailError(!isValidEmail);
    }

    if (name === "phone") {
      const isValidPhone =
        /^^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7}$/gm.test(value);
      setPhoneError(!isValidPhone);
    }

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formValues
      );
      store.state.users.push(response.data);
      navigate("/users");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className={classnames(`wrapper ${isDarkMode ? "wrapperDark" : ""}`)}
        onSubmit={handleSubmit}
      >
        <div className={styles.panel}>
          <Link className={styles.panelBack} to="/users">
            назад
          </Link>
          <div className={styles.panelRight}>
            <Link className={styles.panelLink} to="">
              просмотр
            </Link>
            <Link className={styles.panelLink} to="/users">
              список
            </Link>
            <Link className={styles.panelLink} to="">
              удалить пользователя
            </Link>
          </div>
        </div>
        <h2
          className={classnames(
            `${styles.title} ${isDarkMode ? styles.titleDark : ""}`
          )}
        >
          Создать пользователя
        </h2>
        <div className={styles.blocks}>
          <section className={styles.inpContainer}>
            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="name"
              >
                ФИО
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>

            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="username"
              >
                логин
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="username"
                name="username"
                type="text"
                value={formValues.username}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>
          </section>

          <section className={styles.inpContainer}>
            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="email"
              >
                e-mail
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="email"
                name="email"
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>
            {emailError && (
              <div className={styles.error}>Введите корректный email</div>
            )}

            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="website"
              >
                веб-сайт
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="website"
                name="website"
                type="text"
                value={formValues.website}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>
          </section>

          <div className={styles.inputBox}>
            <label
              className={classnames(
                `${styles.labelCreate} ${
                  isDarkMode ? styles.labelCreateDark : ""
                }`
              )}
              htmlFor="phone"
            >
              телефон
            </label>
            <input
              className={classnames(
                `${styles.inputCreate} ${
                  isDarkMode ? styles.inputCreateDark : ""
                }`
              )}
              id="phone"
              name="phone"
              type="text"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="Введите данные"
            />
          </div>
          {phoneError && (
            <div className={styles.errorPhone}>Введите корректный телефон</div>
          )}

          <p
            className={`${styles.subtitle} ${
              isDarkMode ? styles.subtitleDark : ""
            }`}
          >
            Адрес
          </p>

          <section className={styles.inpContainer}>
            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="zipcode"
              >
                индекс
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="zipcode"
                name="zipcode"
                type="text"
                value={formValues.zipcode}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>

            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="city"
              >
                город
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="city"
                name="city"
                type="text"
                value={formValues.city}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>
          </section>

          <div className={styles.inputBox}>
            <label
              className={classnames(
                `${styles.labelCreate} ${
                  isDarkMode ? styles.labelCreateDark : ""
                }`
              )}
              htmlFor="street"
            >
              улица
            </label>
            <input
              className={classnames(
                `${styles.inputCreate} ${
                  isDarkMode ? styles.inputCreateDark : ""
                }`
              )}
              id="street"
              name="street"
              type="text"
              value={formValues.street}
              onChange={handleInputChange}
              placeholder="Введите данные"
            />
          </div>

          <p
            className={`${styles.subtitle} ${
              isDarkMode ? styles.subtitleDark : ""
            }`}
          >
            Компания
          </p>

          <section className={styles.inpContainer}>
            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="nameComp"
              >
                название
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="nameComp"
                name="nameComp"
                type="text"
                value={formValues.nameComp}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>

            <div className={styles.inputBox}>
              <label
                className={classnames(
                  `${styles.labelCreate} ${
                    isDarkMode ? styles.labelCreateDark : ""
                  }`
                )}
                htmlFor="catchPhrase"
              >
                описание
              </label>
              <input
                className={classnames(
                  `${styles.inputCreate} ${
                    isDarkMode ? styles.inputCreateDark : ""
                  }`
                )}
                id="catchPhrase"
                name="catchPhrase"
                type="text"
                value={formValues.catchPhrase}
                onChange={handleInputChange}
                placeholder="Введите данные"
              />
            </div>
          </section>
          <button
            className={classnames(
              `${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ""}`
            )}
            type="submit"
          >
            создать {">>>"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
