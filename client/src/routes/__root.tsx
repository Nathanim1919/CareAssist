// src/routes/__root.tsx
import { Outlet } from "@tanstack/react-router";
import { AuthProvider } from "../context/AuthContext";

const Root = () => {
  return (
    <div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default Root;
