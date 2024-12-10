import React, { createContext, useState, ReactNode, useEffect } from "react";
import { apiConfig } from "../utils/apiConfig";
import { useNavigate } from "@tanstack/react-router";

interface AuthContextType {
  userData: { email: string; fullName: string; role: string };
  setUserData: (userData: {
    email: string;
    fullName: string;
    role: string;
  }) => void;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiConfig.get("/auth/me");
        setUserData(res.data.user);
        navigate({ to: "/chats" });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [navigate]); // Ensure navigation works correctly

  const login = async (userData: { email: string; password: string }) => {
    try {
      const res = await apiConfig.post("/auth/login", userData, {
        withCredentials: true,
      });
      setUserData(res.data.user); // Expect `user` field in the response
      navigate({ to: "/chats" }); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials or server error.");
    }
  };

  const logout = async () => {
    try {
      await apiConfig.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUserData({ email: "", fullName: "", role: "" });
    navigate({ to: "/login" }); // Redirect to login page
  };

  return (
    <authContext.Provider value={{ userData, setUserData, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
