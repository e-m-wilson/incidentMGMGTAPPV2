import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [checking, setChecking] = useState(true);

  const login = useCallback(async () => {
    window.location.href = "http://localhost:3001/auth/login";
  }, []);

  const logout = useCallback(async () => {
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
    setIsLogged(false);
  }, []);

  const reload = useCallback(async () => {
    setChecking(true);
    try {
      const r = await axios.get("http://localhost:3001/auth/status", {
        withCredentials: true,
      });
      setIsLogged(Boolean(r.data.authenticated));
    } catch (err) {
      setIsLogged(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(
    () => ({ isLogged, checking, login, reload, logout }),
    [isLogged, checking, login, reload, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
