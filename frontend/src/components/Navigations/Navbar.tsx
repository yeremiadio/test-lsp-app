import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import UserDropdown from "../Dropdowns/UserDropdown";

const Navbar = () => {
  const { student } = useAppSelector((state) => state.auth.data);
  return (
    <header className="fixed w-full z-40 top-0">
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto p-4 md:px-12 py-5">
          <div className="flex justify-between">
            <Link to={student ? "/student" : "/"}>
              <span className="font-extrabold text-blue-500 cursor-pointer">
                Student App
              </span>
            </Link>
            <div>
              <UserDropdown name={student.name} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
