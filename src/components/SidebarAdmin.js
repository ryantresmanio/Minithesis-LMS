import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { IoArrowUndoCircleOutline, IoArrowRedoCircleOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import Profile from "../assets/scclogo.webp";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { handleLogout } from "./Logout";

const SidebarAdmin = () => {
  const [isOpen, setisOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div>
      {!isOpen ? (

        // Maliit na sidebar
        <div className="relative top-0 left-0 h-full w-20 bg-black z-50 transition-sidebar">
          <ul className="flex flex-col h-full gap-2">
            <li
              className="text-3xl text-center px-4 py-3 m-2 text-white hover:text-blue hover:rounded-xl cursor-pointer"
              onClick={() => setisOpen(true)}
            >
              <IoArrowRedoCircleOutline  />
            </li>

            <hr className="m-2 text-white text-opacity-50" />

            <Link to="/home-admin">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/home-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdSpaceDashboard />
              </li>
            </Link>

            <Link to="/attendance-log">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/attendance-log") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <FaPersonWalkingArrowRight />
              </li>
            </Link>

            <Link to="/books-admin">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/books-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <GiBookmarklet />
              </li>
            </Link>

            <Link to="/create-accounts">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/create-accounts") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <FaUserCog />
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-white text-opacity-50" />
              <li className="text-3xl text-center px-4 py-3 m-2 text-white hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <GiExitDoor  />
              </li>
            </div>
          </ul>
        </div>


      ) : (

        // Malaking sidebar
        <div className="relative top-0 left-0 h-full bg-black w-72 transition-sidebar">
          <ul className="flex flex-col min-h-screen gap-2">
            <div className="flex items-center m-2 p-2">
              <img
                src={Profile}
                alt="cooler"
                width="48"
                height="48"
                className="rounded-full"
              />

              <div className="ml-3">
                <h1 className="text-base font-bold text-white">
                  Administrator
                  <span className="block text-sm text-gray font-normal">
                    Librarian
                  </span>
                </h1>
              </div>

              <div className="text-3xl ml-auto text-white mb-3 hover:text-blue cursor-pointer" onClick={() => setisOpen(!isOpen)}>
                <IoArrowUndoCircleOutline />
              </div>
            </div>

            <hr className="m-2 text-gray text-opacity-50" />

            <Link to="/home-admin">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/home-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdSpaceDashboard className="text-3xl mr-2" />Dashboard
              </li>
            </Link>

            <Link to="/attendance-log">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/attendance-log") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <FaPersonWalkingArrowRight className="text-3xl mr-2" />Walk in
              </li>
            </Link>

            <Link to="/books-admin">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/books-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <GiBookmarklet className="text-3xl mr-2" />Books
              </li>
            </Link>

            <Link to="/create-accounts">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/create-accounts") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <FaUserCog className="text-3xl mr-2" />Create Account
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-gray text-opacity-50" />
              <li className="text-white text-base flex items-center px-4 py-3 m-3 hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <GiExitDoor  className="text-3xl mr-2" />Log Out
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarAdmin;