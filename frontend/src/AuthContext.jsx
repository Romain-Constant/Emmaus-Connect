import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(); // creation un contexte AuthContext pour partager les données d'authentification entre les composants de l'application.

export function AuthContextProvider({ children }) {
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  // AuthContextProvider qui sert de fournisseur de context. tout les composant enveloppés ddeans(app) auront acces (login , logout etc..)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null // currentUser qui est initialisée avec la valeur stockée dans le local storage ou null si aucune valeur n'est présente.
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/users/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/users/logout");

    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const contextValue = useMemo(
    () => ({ currentUser, login, logout }),
    [currentUser, login, logout]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
