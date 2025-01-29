import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { Link } from "@tanstack/react-router";
import { FaSpinner } from "react-icons/fa6";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const auth = useContext(AuthContext) as AuthContextType;
  const {loading, login} = auth;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
        await login(userData);
      } catch (error) {
        console.error("Login failed:", error);
      }
  };

  return (
    <div className="relative w-screen h-screen grid place-items-center bg-gray-950">
      <div className="bg-gray-800 p-5 grid rounded-lg">
        <h1 className="place-self-center text-white font-bold">Login Page</h1>
        <form className="grid gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col text-white">
            <label className="justify-self-start" htmlFor="email">
              Email
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
              value={userData.email}
            />
          </div>
          <div className="flex flex-col text-white">
            <label className="justify-self-start" htmlFor="password">
              Password
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
              value={userData.password}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-1 px-3 rounded-lg grid place-items-center
            ${loading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-white text-gray-800"}
              `}
          >
            {auth?.loading ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>
          <Link to="/register" className="text-white text-center">
            Don't have an account? <span className="text-blue-700">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;