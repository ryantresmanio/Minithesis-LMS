import React, { useState } from "react";
import { supabase } from '../../utils/supabaseClient';
import Profile from "../../assets/profile.jpg";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";

const Setting = ({
  userFirstName,
  userLastName,
  userMiddleName,
  userEmail,
  userCourse,
  userPassword,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentVisible, setCurrentVisible] = useState(false);
  const [reTypeVisible, setReTypeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password must match Re-type password");
      return;
    }

    if (currentPassword !== userPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }

    try {
      setIsLoading(true);

      const { error: updateError } = await supabase
        .from("users")
        .update({ password: newPassword })
        .eq("email", userEmail);

      if (updateError) {
        throw updateError;
      }

      toast.success("Password updated successfully", {
        autoClose: 1000,
        hideProgressBar: true,
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error updating password:", error.message);
      toast.error("Error updating password", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      setPasswordError("Error updating password. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 px-5">
      <div className="flex justify-center items-center bg-white shadow my-24 mx-3 rounded-xl h-3/4">
        <div className="m-auto p-10 mr-4">
          <ul className="list-unstyled">
            <li className="mb-2 flex flex-col items-center">
              <img src={Profile} alt="User profile" height={300} width={300} />
              <button
                className="text-black hover:text-blue hover:underline mt-2"
                onClick={handleOpenModal}
              >
                Change password
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-grow pl-10 p-10">
          <h1 className="text-3xl mb-4 text-left pr-5 font-semibold">
            Student Information
          </h1>
          <div className="grid grid-cols-2 gap-8 place-content-evenly">
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">First Name:</label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">{userFirstName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">Middle Name:</label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">{userMiddleName}</p>
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold mb-2">Last Name:</label>
              <p class="text-black bg-gray p-3 rounded-lg w-4/5">{userLastName}</p>
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold mb-2">Course:</label>
              <p class="text-black bg-gray p-3 rounded-lg w-4/5">{userCourse}</p>
            </div>
            <div class="mb-4">
              <label class="block text-black font-bold mb-2">Email:</label>
              <p class="text-black bg-gray p-3 rounded-lg w-4/5">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4 relative">
                <label className="text-sm ml-1 font-semibold">Current password:</label>
                <input
                  type={currentVisible ? "text" : "password"}
                  placeholder="Current Password"
                  className="rounded-lg input-border shadow px-3 py-2 mb-2 w-full"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <div
                  className="absolute right-0 top-0 mt-9 mr-4 text-lg text-blue"
                  onClick={() => setCurrentVisible(!currentVisible)}
                >
                  {currentVisible ? <IoEyeOutline /> : <AiOutlineEyeInvisible />}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm ml-1 font-semibold">New password:</label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="rounded-lg input-border shadow px-3 py-2 mb-2 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="text-sm ml-1 font-semibold">Re-type password:</label>
                <input
                  type={reTypeVisible ? "text" : "password"}
                  placeholder="Re-type Password"
                  className="rounded-lg input-border shadow px-3 py-2 mb-2 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute right-0 top-0 mt-9 mr-4 text-lg text-blue"
                  onClick={() => setReTypeVisible(!reTypeVisible)}
                >
                  {reTypeVisible ? <IoEyeOutline /> : <AiOutlineEyeInvisible />}
                </div>
              </div>

              {passwordError && (
                <p className="text-red my-2 text-base">{passwordError}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white py-2 px-4 rounded mr-2 bg-blue"
                  disabled={isLoading} 
                >
                  {isLoading ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    "Confirm"
                  )}
                </button>
                <button
                  className="text-black py-2 px-4 rounded bg-gray"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
