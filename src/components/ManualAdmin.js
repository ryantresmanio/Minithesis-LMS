import React, { useState } from 'react';
import { GrHelpBook } from "react-icons/gr";

const ManualAdmin = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='Manual'>
      {/* Floating Button to open the manual */}
      <div className="fixed bottom-4 right-4 group"> 
        <button
          className="bg-black text-3xl p-3 rounded-full shadow-lg"
          onClick={handleOpenModal}>
          <GrHelpBook className="text-white" />
        </button>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-3 right-16 bg-black py-1 px-2 rounded-lg shadow text-white text-base">
          Manual
        </div>
      </div>


      {/* Modal content */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50" onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-center">Admin Manual</h2>
            <p className="text-sm text-black mb-4 text-center">
              This section is designed to guide the admin through different functionalities and processes.
            </p>

            {/* Guide for Signing In/Out Walk-Ins */}
            <div className='my-4'>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Signing In and Signing Out Walk-Ins</h3>
              <h4 className="text-base font-semibold mb-2">Signing In:</h4>
              <ul className="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Walk-In"</span> tab on the sidebar.</li>
                <li className="ml-4">Click the <span className='font-semibold'>"Sign In"</span> button at the top right corner to open a pop-up form.</li>
                <li className="ml-4">Enter the student number. The system will auto-fill the required information.</li>
                <li className="ml-4">Verify the information, then click <span className='font-semibold'>"Sign In"</span> to complete the process.</li>
              </ul>

              <h4 className="text-base font-semibold mb-2">Signing Out:</h4>
              <ul className="list-disc ml-4 mb-4">
                <li className="ml-4">Find the student's entry in the Action column.</li>
                <li className="ml-4">Click <span className='font-semibold'>"Sign Out"</span> to automatically record the time out.</li>
              </ul>

              <h4 className="text-base font-semibold mb-2">Additional Note:</h4>
              <p>
                To generate a PDF file of the records, click <span className='font-semibold'>"Export as PDF."</span> Use the calendar filter to specify the desired record range.
              </p>
            </div>

            {/* Guide for Issuing Books */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Issuing and Returning Books</h3>
              <h4 className="text-base font-semibold mb-2">Issuing Book:</h4>
              <ul className="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab on the sidebar.</li>
                <li className="ml-4">Ensure <span className='font-semibold'>"Books"</span> is selected in the dropdown beside the search bar.</li>
                <li className="ml-4">Find the book to issue and click the <span className='font-semibold'>"Issue Book"</span> button.</li>
                <li className="ml-4">Enter the student number and other required information (issue and return dates).</li>
                <li className="ml-4">Click <span className='font-semibold'>"Submit"</span> to complete the book issuance process.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Marking Books as Returned:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab, then select <span className='font-semibold'>"Issue"</span> from the dropdown beside the search bar.</li>
                <li className="ml-4">Identify the book in the list of issued books.</li>
                <li className="ml-4">Click <span className='font-semibold'>"Mark as Returned"</span> to record the return.</li>
              </ul>
            </div>

            {/* Guide for Creating User Accounts */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Creating User Accounts</h3>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Create Account"</span> tab on the sidebar.</li>
                <li className="ml-4">Click <span className='font-semibold'>"Add User"</span> to open the form for creating a new user account.</li>
                <li className="ml-4">Fill in the required information and click <span className='font-semibold'>"Create Account"</span> to add the new user.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Additional Note:</h4>
              <p>
                You can generate a PDF of the records by clicking <span className='font-semibold'>"Export as PDF."</span> Use the calendar filter to specify the desired record range.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualAdmin;
