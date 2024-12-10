import { useState } from "react";
import { apiConfig } from "../utils/apiConfig";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    fullName:"",
    email:"",
    password:"",
    role:""
  })
  const handleResister = async (e
    : React.FormEvent<HTMLFormElement>

  ) => {
    e.preventDefault();
    const res = await apiConfig.post("/auth/register", userData);
    console.log(res) 
  }


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }
  return (
    <div className="relative w-screen h-screen grid place-items-center bg-gray-950">
      <div className="bg-gray-800 p-5 grid rounded-lg">
        <h1 className="place-self-center text-white font-bold">Create Account</h1>
        <form className=" grid gap-5" onSubmit={handleResister}>
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
            <label className="justify-self-start" htmlFor="username">
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
          <div className="flex flex-col text-white">
            <label className="justify-self-start" htmlFor="password">
              Role
            </label>
            <input
              className="py-1 px-3 bg-gray-800 outline-none border border-gray-700 rounded-lg"
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleOnChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-gray-800 py-1 px-3 rounded-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
