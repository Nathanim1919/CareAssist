import React from "react";

const Nabar: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="logo">
        <h1>Care-Assist</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div>
            <h3>Nathan Tadele</h3>
            <p>Doctor</p>
        </div>
      </div>
    </div>
  );
};

export default Nabar;
