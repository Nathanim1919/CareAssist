import { useContext, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FaSpinner } from "react-icons/fa6";
import { AuthContext, AuthContextType } from "../context/AuthContext";


const RegisterPage = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "nurse", // Default role
  });
  const auth = useContext(AuthContext) as AuthContextType;
  const { loading, register } = auth;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(userData);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-screen h-screen grid place-items-center bg-gray-950">
      <div className="bg-gray-800 p-5 grid rounded-lg">
        <h1 className="place-self-center text-white font-bold">Create Account</h1>
        <form className="grid gap-5" onSubmit={handleRegister}>
          <div className="flex flex-col text-white">
            <label htmlFor="email" className="justify-self-start">
              Email
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col text-white">
            <label htmlFor="fullName" className="justify-self-start">
              Full Name
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="text"
              placeholder="Full Name"
              name="fullName"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col text-white">
            <label htmlFor="password" className="justify-self-start">
              Password
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col text-white">
            <label htmlFor="role" className="justify-self-start">
              Role
            </label>
            <select
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              name="role"
              value={userData.role}
              onChange={handleOnChange}
            >
              <option value="nurse">Nurse</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-1 px-3 rounded-lg grid place-items-center
            ${loading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-white text-gray-800"}
              `}
          >
            {auth?.loading ? <FaSpinner className="animate-spin" /> : "Create Account"}
          </button>
          <Link to="/login" className="text-white text-center">
            Already have an account? <span className="text-blue-700">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
