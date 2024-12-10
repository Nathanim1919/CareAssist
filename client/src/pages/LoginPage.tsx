import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
 
  const auth = useContext(authContext);

  const { login } = auth!;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userData);
    
  };
  return (
    <div className="relative w-screen h-screen grid place-items-center bg-gray-950">
      <div className="bg-gray-800 p-5 grid rounded-lg">
        <h1 className="place-self-center text-white font-bold">Login Page</h1>
        <form className=" grid gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col text-white">
            <label className="justify-self-start" htmlFor="username">
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
            <label className="justify-self-start" htmlFor="password">
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
          <button
            type="submit"
            className="w-full bg-white text-gray-800 py-1 px-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
