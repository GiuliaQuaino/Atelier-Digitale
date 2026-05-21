import { createContext, useContext, useState } from "react";
import users from "../data/users.json";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utente, setUtente] = useState(null);

  function login(username, password) {
    const trovato = users.find(
      u => u.username === username && u.password === password
    );
    if (trovato) {
      setUtente(trovato);
      return true;
    }
    return false;
  }

  function logout() {
    setUtente(null);
  }

  return (
    <AuthContext.Provider value={{ utente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}