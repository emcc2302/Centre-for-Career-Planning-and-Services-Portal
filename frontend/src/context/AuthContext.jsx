// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [tempUserId, setTempUserId] = useState("");
  const [authUser, setAuthUser] = useState(() => {
    const raw = localStorage.getItem("ccps-user");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.userData) {
        return { ...parsed.userData, token: parsed.token };
      }
      return parsed;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (authUser?.userData && !authUser.role) {
      const { userData, token } = authUser;
      setAuthUser({ ...userData, token });
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("ccps-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("ccps-user");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, tempUserId, setTempUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
