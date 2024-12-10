"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AuthContext, { User } from "./AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiUrl } from "../../../app/utils/urls"
interface AuthProviderProps {
  children: ReactNode;
  deps?: any[];
}

const AuthProvider = ({ children, deps = [] }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const [byThirdParty, setByThirdParty] = useState<boolean | null>(null);
  const router = useRouter();
  const session = useSession();
  type withoutEmail = Omit<typeof user, "email">;
  type withoutUsername = Omit<typeof user, "username">;

  const login = async (
    password: string,
    identifier: boolean,
    email?: string,
    username?: string
  ) => {
    const requestData: withoutEmail | withoutUsername = identifier
      ? { username: username, password: password }
      : { email: email, password: password };

    console.log("This is the data", requestData);
    const response = await axios.post(`${apiUrl}/api/login`, requestData);
    const data = await response.data;
    try {
      if (response.status === 200) {
        localStorage.setItem("jwt-main", data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        setByThirdParty(false);
        router.push("/dashboard");
      }
      if (response.status === 400) {
        setIsAuthenticated(false);
        console.log("User does not exist or invalid credentials");
      }
    } catch (error) {
      if (response.status === 400) {
        setIsAuthenticated(false);
      }
      console.log("An unexpected error occurred:", error);
    }
  };

  const logout = () => {
    const token = localStorage.getItem("jwt-main");
    if (token) {
      localStorage.removeItem("jwt-main");
    }
    setUser(null);
    setIsAuthenticated(false);

    if (session.status === "authenticated") {
      setByThirdParty(false);
    }
    router.push("/login");
  };

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("jwt-main");
    if (token) {
      setIsAuthenticated(true);
      router.push("/dashboard");
      return;
    } else if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, session.status]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        byThirdParty,
        setByThirdParty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
