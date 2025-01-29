import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Nabar: React.FC = () => {
  const auth = useContext(AuthContext);
  const { userData, logout } = auth!;
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="flex w-[70%] mx-auto py-2 justify-between items-center">
      <div className="logo">
        <h1>Care-Assist</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer"
          onClick={() => setShowProfile(!showProfile)}
        ></div>
        {showProfile && <div className="absolute z-50 bg-gray-800 rounded-lg shadow-2xl top-12  grid gap-5 p-3">
          <div>
            <h3>Name <span className="text-gray-400">{userData?.fullName}</span></h3>
            <h3>Email <span className="text-gray-400">{userData?.email}</span></h3>
            <h3>Profession <span className="text-gray-400">{userData?.role}</span></h3>
          </div>
          <div>
            <button onClick={()=>{logout(); setShowProfile(false)}} className="bg-red-800 text-white p-1 px-2 rounded-md">
              Logout
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Nabar;
