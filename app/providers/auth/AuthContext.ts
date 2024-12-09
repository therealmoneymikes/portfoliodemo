import React, { createContext } from "react";

export interface User {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthContextType {
  user: User | null | undefined;
  login: (
    password: string,
    identifier: boolean,
    email?: string,
    username?: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean | null;
  byThirdParty?: boolean | null;
  setByThirdParty: React.Dispatch<React.SetStateAction<boolean | null>>;
  profilePicture?: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
