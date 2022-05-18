import Router from "next/router";
import { createContext, ReactNode, useState } from "react";

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

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({ email, permissions, roles });

      Router.push("/dashboard");

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