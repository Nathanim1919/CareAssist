import React, { createContext, useState, ReactNode, useEffect } from "react";
import { apiConfig } from "../utils/apiConfig";
import { useNavigate } from "@tanstack/react-router";

export interface AuthContextType {
  userData: { _id: string; email: string; fullName: string; role: string };
  setUserData: (userData: {
    _id: string;
    email: string;
    fullName: string;
    role: string;
  }) => void;
  loading: boolean;
  login: (userData: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    fullName: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    fullName: "",
    role: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await apiConfig.get("/auth/me");
        setUserData(res.data.user);
        navigate({ to: "/chats" });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate({ to: "/" });
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [navigate]);

  const login = async (userData: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await apiConfig.post("/auth/login", userData, {
        withCredentials: true,
      });
      setUserData(res.data.user);
      navigate({ to: "/chats" });
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiConfig.post("/auth/logout", {}, { withCredentials: true });
      setUserData({ _id: "", email: "", fullName: "", role: "" });
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };


  const register = async (userData: {
    email: string;
    password: string;
    fullName: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      await apiConfig.post("/auth/register", userData);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Register failed:", error);
      throw new Error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading, login,register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };