import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utente, setUtente] = useState(null);

  function login(user) {
  setUtente(user);
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