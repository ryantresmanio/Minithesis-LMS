import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSettingsFill } from "react-icons/ri";
import { IoArrowUndoCircleOutline, IoArrowRedoCircleOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { GiArchiveResearch} from "react-icons/gi";
import { IoIosHelpCircle, IoIosHelpCircleOutline } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import Profile from "../assets/profile.jpg";

import { handleLogout } from "./Logout";

const SidebarUser = ({ userFirstName, userLastName }) => {
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
            <li className="text-3xl text-center px-4 py-3 m-2 text-white hover:text-blue hover:rounded-xl cursor-pointer" onClick={() => setisOpen(true)}>
              <IoArrowRedoCircleOutline />
            </li>

            <hr className="m-2 text-white text-opacity-50" />

            <Link to="/home-user">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/home-user") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdSpaceDashboard />
              </li>
            </Link>

            <Link to="/search-books">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/search-books") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`} >
                <GiArchiveResearch />
              </li>
            </Link>

            <Link to="/settings">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/settings") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <RiSettingsFill />
              </li>
            </Link>

            <Link to="/FAQ">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/FAQ") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <IoIosHelpCircleOutline />
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-white text-opacity-50" />
              <li className="text-3xl text-center px-4 py-3 m-2 text-white hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <GiExitDoor />
              </li>
            </div>
          </ul>
        </div>

      ) : (

        // Malaking sidebar
        <div className="relative top-0 left-0 h-full bg-black w-72 transition-sidebar">
          <ul className="flex flex-col min-h-screen gap-2">
            <div className="flex items-center m-2 mt-4 p-1">
              <img
                src={Profile}
                alt="cooler"
                width="40"
                height="40"
                className="rounded-full"
              />

              <div className="ml-3">
                <h1 className="text-base font-bold text-white">
                  {userFirstName} {userLastName}
                  <span className="block text-sm text-gray font-normal">
                    Student
                  </span>
                </h1>
              </div>

              <div className="text-3xl ml-auto text-white mb-3 hover:text-blue cursor-pointer" onClick={() => setisOpen(!isOpen)}>
                <IoArrowUndoCircleOutline />
              </div>
            </div>

            <hr className="m-2 text-gray text-opacity-50" />

            <Link to="/home-user">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/home-user") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdSpaceDashboard className="text-3xl mr-2" />
                Dashboard
              </li>
            </Link>

            <Link to="/search-books">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/search-books") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <GiArchiveResearch className="text-3xl mr-2 text-" />
                Search Books
              </li>
            </Link>

            <Link to="/settings">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/settings") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <RiSettingsFill className="text-3xl mr-2" />
                Account Settings
              </li>
            </Link>

            <Link to="/FAQ">
              <li className={`text-white text-base flex items-center px-4 py-3 m-3 ${isActive("/FAQ") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <IoIosHelpCircle className="text-3xl mr-2" />
                Help and Support
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-gray text-opacity-50" />
              <li className="text-white text-base flex items-center px-4 py-3 m-3 hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <GiExitDoor className="text-3xl mr-2" /> Log Out
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarUser;