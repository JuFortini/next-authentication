import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  console.log('oi fora');

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api.get("/me").then(response => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      })
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;
      
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,  // 30 days
        path: "/",
      })
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,  // 30 days
        path: "/"
      })
      
      setUser({ email, permissions, roles });
      
      console.log('oi signIn');
      
      Router.push("/dashboard");
      
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

    } catch(err) {
      console.log(err.response.data.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}