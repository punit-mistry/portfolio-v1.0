import React from "react";
import { ModeToggle } from "./mode-toggle";
const navbar = () => {
  return (
    <div className="top-0 sticky z-50 bg-white dark:!bg-black">
      <div className="px-5 py-3 flex  justify-between shadow-2xl  dark:shadow-gray-700  ">
        <div>Punit Mistry</div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default navbar;
