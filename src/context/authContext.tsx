import { createContext } from "react";

interface Context {
  token: null | string;
  userId: null | string;
  login: (token: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<Context>({
  token: null,
  userId: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
