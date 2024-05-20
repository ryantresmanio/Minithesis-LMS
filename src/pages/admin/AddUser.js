import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { FaRegFilePdf } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ClipLoader } from 'react-spinners';

const UserListAdmin = () => {

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Pang fetch ng users sa table
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false); 

  // Ginagamit sa add
  const [user, setUser] = useState({
  });


  // Pang realtime fetch
  useEffect(() => {
    fetchUsers();
  }, []);


  // Fetch users para sa table
  async function fetchUsers() {
    const { data } = await supabase.from('users').select('*');
    setUsers(data);
    setLoading(false);
  }


  // Pang handle ng mga input sa form
  function handleChange(event) {
    setUser((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }


  // Add user to database
  async function addUser() {
    setUserLoading(true);

    try {

      const formattedDate = new Date().toISOString().split('T')[0];

      await supabase
        .from('users')
        .insert([
          {
            student_number: user.studentNumber,
            password: user.password,
            last_name: user.lastName,
            first_name: user.firstName,
            middle_name: user.middleName,
            email: user.email,
            course: user.course,
            timestamp: formattedDate,
          },
        ]);

      setShowModal(false);
      fetchUsers();

      toast.success("User added successfully", {
        autoClose: 1000,
        hideProgressBar: true
      });


      // Pang empty ng form 
      setUser({
        studentNumber: '',
        lastName: '',
        firstName: '',
        middleName: '',
        password: '',
        email: '',
        course: ''
      });

      setUserLoading(false);

    } catch (error) {
      toast.error("Error adding user. Please try again.", {
        autoClose: 1000,
        hideProgressBar: true
      });
      setUserLoading(false);
    }
  }


  // Search bar and category
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "BSCS", "BSTM", "BSHM", "POLSCI", "BEED", "BSBA"];

  const filteredData = users.filter((user) =>
    selectedCategory === 'All' || user.course === selectedCategory
      ? String(user.student_number).includes(searchQuery) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.middle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );


  const handleExport = () => {
    const doc = new jsPDF();
    const margin = 16;

    const addText = (text, x, y, size = 12) => {
      doc.setFont("Poppins", "sans-serif");
      doc.setFontSize(size);
      doc.setTextColor(0, 0, 0);
      doc.text(text, x, y);
    };

    const today = new Date();
    const date = today.toLocaleDateString();

    addText("Library Management System", (doc.internal.pageSize.width - doc.getStringUnitWidth("Library Management System") * doc.internal.getFontSize() / doc.internal.scaleFactor) / 2, margin, 20);
    addText("User List", margin, margin + 20);
    addText("Date: " + date, doc.internal.pageSize.width - 35, margin + 20, 10);

    const startY = Math.max(margin + 16, margin + 16 + doc.getTextDimensions("User List").h + 2);

    const tableHeaders = ["Student No.", "Lastname", "Firstname", "Middlename", "Email", "Course"];
    const tableData = filteredData.map(user => [user.student_number, user.last_name, user.first_name, user.middle_name, user.email, user.course]);

    doc.autoTable({
      startY: startY,
      head: [tableHeaders],
      body: tableData,
      margin: { top: startY },
      tableLineColor: [0, 0, 0],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0]
      },
      bodyStyles: {
        lineWidth: 0.1,
        textColor: [0, 0, 0]
      }
    });

    doc.save("Users list.pdf");
  };

  return (
    <div className='px-5 flex-1'>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="black" size={50} />
        </div>
      ) : (
        <div className='user-table'>
          <div className='bg-white my-5 px-2 py-2 rounded-xl shadow flex justify-between'>
            <div className='flex items-center w-full'>
              <MdPersonSearch className='text-3xl mx-2 my-2' />

              <input
                type='text'
                placeholder='Search'
                className="w-3/4 px-4 py-2 border border-opacity-25 rounded-xl focus:outline-none focus:ring-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              id='category'
              name='category'
              className='w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm sm:text-sm'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>


          <div className="admin-table overflow-y-auto rounded-xl custom-scrollbar">
            <table className='bg-white w-full rounded-2xl px-2 py-2 shadow-xl'>
              <thead className='sticky top-0 bg-white'>
                <tr className='pb-2'>
                  <th colSpan='6'>
                    <div className='flex justify-between items-center px-5 py-4'>
                      <h2 className='text-xl text-black'>Users list</h2>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleExport}
                          className="bg-gray text-black text-sm p-3 flex items-center rounded-xl hover:bg-blue hover:text-white cursor-pointer">
                          <FaRegFilePdf className="mr-1" />
                          Export as PDF
                        </button>
                        <button
                          className="bg-gray text-black text-sm font-semibold rounded-xl p-3 hover:bg-blue hover:text-white"
                          onClick={handleOpenModal}>
                          Add User
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>

                <tr className='text-left text-black text-lg border-b border-gray'>
                  <th className='px-5 py-4 w-1/6'>Student No.</th>
                  <th className='px-5 py-4 w-1/6'>Lastname</th>
                  <th className='px-5 py-4 w-1/6'>Firstname</th>
                  <th className='px-5 py-4 w-1/6'>Middlename</th>
                  <th className='px-5 py-4 w-1/6'>Course</th>
                  <th className='px-5 py-4 w-1/6'>Email</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id} className="border-b border-gray text-sm">
                    <td className="px-5 py-2">{user.student_number}</td>
                    <td className="px-5 py-2">{user.last_name}</td>
                    <td className="px-5 py-2">{user.first_name}</td>
                    <td className="px-5 py-2">{user.middle_name}</td>
                    <td className="px-5 py-2">{user.course}</td>
                    <td className="px-5 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-10 flex justify-center items-center shadow-2xl bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
              <div className="bg-white p-4 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Student Information
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); addUser(user); }}>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col w-72">
                      <label className="text-sm m-1 font-semibold">Student number:</label>

                      <input
                        type="number"
                        placeholder="Student Number"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="studentNumber"
                        value={user.studentNumber}
                        onChange={handleChange}
                        required
                      />

                      <label className="text-sm m-1 font-semibold">Lastname:</label>
                      <input
                        type="text"
                        placeholder="Lastname"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                      />

                      <label className="text-sm m-1 font-semibold">Firstname:</label>
                      <input
                        type="text"
                        placeholder="Firstname"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                      />

                      <label className="text-sm m-1 font-semibold">Middlename:</label>
                      <input
                        type="text"
                        placeholder="Middlename"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="middleName"
                        value={user.middleName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col w-72">
                      <label className="text-sm m-1 font-semibold">Password:</label>
                      <div className="relative">
                        <input
                          type={visible ? "text" : "password"}
                          placeholder="Password"
                          className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          required
                        />
                        <div className="absolute right-0 top-0 mt-4 mr-4 text-xl text-blue" onClick={() => setVisible(!visible)}>
                          {
                            visible ? <IoEyeOutline /> : <AiOutlineEyeInvisible />
                          }
                        </div>
                      </div>
                      <label className="text-sm m-1 font-semibold">Email:</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />

                      <label className="text-sm m-1 font-semibold">Course:</label>
                      <input
                        type="text"
                        placeholder="Course"
                        className="shadow input-border rounded-xl text-sm px-5 py-4 mb-4 w-full"
                        name="course"
                        value={user.course}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue">
                      {userLoading ? <ClipLoader size={20} color="white" /> : "Create account"}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserListAdmin;
