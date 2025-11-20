import { createContext } from "react";

export const AuthContext = createContext({
  isLogged: false,
  checking: true,
  reload: () => {},
  logout: () => {},
  login: () => {},
});
