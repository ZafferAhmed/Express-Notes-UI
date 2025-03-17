import { PenLine } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <section className="container h-full flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between gap-3">
            <PenLine className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              NoteKeeper Login
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
