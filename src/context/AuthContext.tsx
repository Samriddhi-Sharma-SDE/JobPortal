"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, login as apiLogin, register as apiRegister } from "@/lib/mock-db";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (data: Omit<User, 'id' | 'companyId' | 'status'> & { companyName?: string }) => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const fullUser = getUser(parsedUser.id);
          if (fullUser) {
            setUser(fullUser);
          } else {
             localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = apiLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return loggedInUser;
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (data: Omit<User, 'id' | 'companyId' | 'status'> & { companyName?: string }) => {
    setIsLoading(true);
    try {
        const newUser = apiRegister(data);
        return newUser;
    } catch(error) {
        throw error;
    } finally {
        setIsLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value = { user, isLoading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
