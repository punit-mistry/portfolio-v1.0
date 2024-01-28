import React from "react";
import { ModeToggle } from "./mode-toggle";
const navbar = () => {
  return (
    <div className="top-0 sticky z-50 bg-white dark:!bg-black">
      <div className="px-5 py-3 flex  justify-between shadow-2xl  dark:shadow-gray-700  ">
        <div className="flex gap-4 font-bold items-center">
          <div className="bg-black flex text-white dark:bg-white dark:text-black items-center w-10 h-8 justify-center ">><span className="terminal-underline  dark:bg-black bg-white w-3 mt-4 h-0.5"> </span>  </div>
          Punit Mistry</div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default navbar;
