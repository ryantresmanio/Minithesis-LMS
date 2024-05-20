import React, { useState } from 'react';
import { GrHelpBook } from "react-icons/gr";

const ManualSuperAdmin = () => {
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
            <h2 className="text-xl font-bold mb-4 text-center">Super Admin Manual</h2>
            <p className="text-sm text-black mb-4 text-center">
              This section is designed to guide the super admin through different functionalities and processes.
            </p>

            {/* Guide for Issuing Books */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Issuing and Returning Books</h3>
              <h4 className="text-base font-semibold mb-2">Issuing Book:</h4>
              <ul className="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab on the sidebar.</li>
                <li className="ml-4">In the dropdown menu beside the search bar, ensure that <span className='font-semibold'>"Books"</span> is selected (this option is typically pre-selected by default).</li>
                <li className="ml-4">A comprehensive list of books will be displayed, featuring an <span className='font-semibold'>"Action"</span> column where you will find three dots <span className='font-semibold'>(...)</span> button.</li>
                <li className="ml-4">Locate the desired book and click on the three dots <span className='font-semibold'>(...)</span> button corresponding to it. Click the <span className='font-semibold'>"Issue"</span> option.</li>
                <li className="ml-4">Enter the student number into the designated field. The system will automatically fill the full name of the student. Additionally, input the issue date as the current date and specify the return date.</li>
                <li className="ml-4">Once all necessary information is provided, click on the <span className='font-semibold'>"Submit"</span> button. The record will then be saved to the <span className='font-semibold'>"Book Issued"</span> table for reference.</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Marking books as returned and deleting transactions</h3>
              <h4 className="text-base font-semibold my-2">Marking Books as Returned:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab.</li>
                <li className="ml-4">In the dropdown menu beside the search bar, select the option <span className='font-semibold'>"Issue"</span>.</li>
                <li className="ml-4">Transaction records will be displayed, offering the option to filter them by date for easier management.</li>
                <li className="ml-4">Identify the transaction record corresponding to the book to be returned. In the <span className='font-semibold'>"Action"</span> column, locate the <span className='font-semibold'>"Mark as Returned"</span> button.</li>
                <li className="ml-4">Click on the <span className='font-semibold'>"Mark as Returned"</span> button associated with the relevant transaction record. This action will initiate the return process, automatically updating the status of the book.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Deleting transactions:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab.</li>
                <li className="ml-4">In the dropdown menu beside the search bar, select the option <span className='font-semibold'>"Issue"</span>.</li>
                <li className="ml-4">Transaction records will be displayed, offering the option to filter them by date for easier management.</li>
                <li className="ml-4">Identify the transaction record corresponding to the book to be returned. In the <span className='font-semibold'>"Action"</span> column, locate the <span className='font-semibold'>"Delete"</span> button.</li>
                <li className="ml-4">Click on the <span className='font-semibold'>"Delete"</span> button associated with the relevant transaction record. A pop-up confirmation wil show, Click <span className='font-semibold'>"Ok"</span> to confirm transaction deletion.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Additional Note:</h4>
              <p>
                To generate a PDF file of the records, click on the <span className='font-semibold'>"Export as PDF"</span> button. Utilize the calendar filter to specify the desired record range for export. If all records are required, simply clear the calendar date to display all records.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Updating and deleting books</h3>
              <h4 className="text-base font-semibold my-2">Updating book information:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"Books"</span> tab on the sidebar and a list of user accounts will be shown.</li>
                <li className="ml-4">In the dropdown menu beside the search bar, ensure that <span className='font-semibold'>"Books"</span> is selected (this option is typically pre-selected by default).</li>
                <li className="ml-4">In the <span className='font-semibold'>"Action"</span> column, click the three dots <span className='font-semibold'>(...)</span> next to the book you want to update.</li>
                <li className="ml-4">Select the <span className='font-semibold'>"Update"</span> option. This will open a form where you can edit the book information.</li>
                <li className="ml-4">After making your changes, click the <span className='font-semibold'>"Update"</span> button to save them.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Deleting user accounts:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"User Lists"</span> tab on the sidebar.</li>
                <li className="ml-4">In the <span className='font-semibold'>"Action"</span> column, click the three dots <span className='font-semibold'>(...)</span> next to the book you want to delete.</li>
                <li className="ml-4">Select the <span className='font-semibold'>"Delete"</span> option.</li>
                <li className="ml-4">A pop-up confirmation wil show, Click <span className='font-semibold'>"Ok"</span> to confirm book deletion.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-blue">Creating, Updating, and Deleting user accounts</h3>
              <h4 className="text-base font-semibold my-2">Creating user accounts:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"User Lists"</span> tab on the sidebar.</li>
                <li className="ml-4">Click the <span className='font-semibold'>"Add user"</span> button. This action will trigger a form to appear.</li>
                <li className="ml-4">Input the necessary information into the designated fields to proceed with creating an account.</li>
                <li className="ml-4">Upon completion, click the <span className='font-semibold'>"Create Account"</span> button. The system will then successfully add the new account to the users list.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Updating user accounts:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"User Lists"</span> tab on the sidebar and a list of user accounts will be shown.</li>
                <li className="ml-4">In the <span className='font-semibold'>"Action"</span> column, click the three dots <span className='font-semibold'>(...)</span> next to the user you want to update.</li>
                <li className="ml-4">Select the <span className='font-semibold'>"Update"</span> option. This will open a form where you can edit their information.</li>
                <li className="ml-4">After making your changes, click the submit button to save them.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Deleting user accounts:</h4>
              <ul class="list-disc ml-4 mb-4">
                <li className="ml-4">Navigate to the <span className='font-semibold'>"User Lists"</span> tab on the sidebar.</li>
                <li className="ml-4">In the <span className='font-semibold'>"Action"</span> column, click the three dots <span className='font-semibold'>(...)</span> next to the user you want to delete.</li>
                <li className="ml-4">Select the <span className='font-semibold'>"Delete"</span> option.</li>
                <li className="ml-4">A pop-up confirmation wil show, Click <span className='font-semibold'>"Ok"</span> to confirm account deletion.</li>
              </ul>

              <h4 className="text-base font-semibold my-2">Additional Note:</h4>
              <p>To generate a PDF file of the records, click on the <span className='font-semibold'>"Export as PDF"</span> button. Utilize the calendar filter to specify the desired record range for export. If all records are required, simply clear the calendar date to display all records.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManualSuperAdmin;
