import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

const Nabar: React.FC = () => {
  const auth = useContext(authContext);
  const { userData } = auth!;
  return (
    <div className="flex w-[80%] mx-auto py-2 justify-between items-center">
      <div className="logo">
        <h1>Care-Assist</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div>
            <h3>{userData?.fullName}</h3>
            <p>{userData?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Nabar;
