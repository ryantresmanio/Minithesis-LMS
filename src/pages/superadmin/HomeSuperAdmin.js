import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import Greetings from "./Greetings";
import { supabase } from '../../utils/supabaseClient';
import { ClipLoader } from "react-spinners"; 

const SA_Dashboard = () => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // Loading state to manage data fetching
  const [isLoading, setIsLoading] = useState(true);

  const [userCountsByDay, setUserCountsByDay] = useState({});
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalUnavailable, setTotalUnavailable] = useState(0);
  const [overdueBooks, setOverdueBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowedBookss, setBorrowedBookss] = useState([]);
  const [topPickedBook, setTopPickedBook] = useState(null);
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchUserCounts(),
        fetchTotalUsers(),
        fetchTotalUnavailableBooks(),
        fetchOverdueBooks(),
        fetchBorrowedBooks(),
        fetchBorrowedStudents(),
      ]);
      setIsLoading(false); // Set loading to false when data fetching is done
    };

    fetchAllData();
  }, []);

  const fetchUserCounts = async () => {
    try {
      const { data: users, error } = await supabase.from('users').select('timestamp');
      if (error) throw error;

      const counts = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0
      };

      users.forEach(user => {
        const dayOfWeek = new Date(user.timestamp).getDay();
        counts[Object.keys(counts)[dayOfWeek]]++;
      });

      setUserCountsByDay(counts);
    } catch (error) {
      console.error("Error fetching user counts:", error.message);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const { data: total, error } = await supabase.from('users').select('*');
      if (error) throw error;
      setTotalUsers(total);
    } catch (error) {
      console.error("Error fetching total users:", error.message);
    }
  };

  const fetchTotalUnavailableBooks = async () => {
    try {
      const { data: unavailableBooks, error } = await supabase.from('books').select('*').eq('availability', 'FALSE');
      if (error) throw error;
      setTotalUnavailable(unavailableBooks.length);
    } catch (error) {
      console.error("Error fetching unavailable books:", error.message);
    }
  };

  const fetchOverdueBooks = async () => {
    try {
      const { data: overdue, error } = await supabase.from('borrowbooks').select('*').eq('status', 'Overdue');
      if (error) throw error;
      setOverdueBooks(overdue.length);
    } catch (error) {
      console.error("Error fetching overdue books:", error.message);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const { data: books, error } = await supabase.from('borrowbooks').select('book_title');
      if (error) throw error;
      setBorrowedBooks(books);
    } catch (error) {
      console.error("Error fetching borrowed books:", error.message);
    }
  };

  const fetchBorrowedStudents = async () => {
    try {
      const { data: students, error } = await supabase.from('borrowbooks').select('full_name');
      if (error) throw error;
      setBorrowedBookss(students);
    } catch (error) {
      console.error("Error fetching borrowed students:", error.message);
    }
  };

  useEffect(() => {
    const countTopBooks = () => {
      const bookCounts = {};
      borrowedBooks.forEach(book => {
        const { book_title } = book;
        bookCounts[book_title] = (bookCounts[book_title] || 0) + 1;
      });
      const sortedBooks = Object.entries(bookCounts).sort((a, b) => b[1] - a[1]);
      if (sortedBooks.length > 0) {
        setTopPickedBook(sortedBooks[0][0]);
      }
    };

    countTopBooks();
  }, [borrowedBooks]);

  useEffect(() => {
    const countTopStudents = () => {
      const studentCounts = {};
      borrowedBookss.forEach(book => {
        const { full_name } = book;
        studentCounts[full_name] = (studentCounts[full_name] || 0) + 1;
      });

      const sortedStudents = Object.entries(studentCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      setTopStudents(sortedStudents);
    };

    countTopStudents();
  }, [borrowedBookss]);

  const options = {
    height: 400,
    axisY: {
      maximum: 16,
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Sunday", y: userCountsByDay.Sunday || 0, color: "#59adff" },
          { label: "Monday", y: userCountsByDay.Monday || 0, color: "#59adff" },
          { label: "Tuesday", y: userCountsByDay.Tuesday || 0, color: "#59adff" },
          { label: "Wednesday", y: userCountsByDay.Wednesday || 0, color: "#59adff" },
          { label: "Thursday", y: userCountsByDay.Thursday || 0, color: "#59adff" },
          { label: "Friday", y: userCountsByDay.Friday || 0, color: "#59adff" },
          { label: "Saturday", y: userCountsByDay.Saturday || 0, color: "#59adff" },
        ],
      },
    ],
  };

  return (
    <div className="statistics-section flex-1">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="black" size={50} />
        </div>
      ) : (
        <div className="superadmin-dashboard">
          <Greetings></Greetings>
          <div className="flex justify-between mt-10 mb-8 gap-5">
            <div className="p-12 h-60 w-full bg-white mx-5 rounded-xl shadow">
              <p className="text-4xl text-center mt-5 font-bold">{totalUsers.length}</p>
              <p className="center text-lg font-bold text-center my-3">Total Users</p>
            </div>

            <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
              <p className="text-xl text-blue text-center mt-5 font-bold">{topPickedBook}</p>
              <p className="center text-lg font-bold text-center my-3">
                Top Picked Book
              </p>
            </div>

            <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
              <p className="text-4xl text-center mt-5 font-bold">{totalUnavailable}</p>
              <p className="center text-lg font-bold text-center my-3">
                Currently Issued Books
              </p>
            </div>

            <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
              <p className="text-4xl text-center mt-5 font-bold">{overdueBooks}</p>
              <p className="center text-lg font-bold text-center my-3">
                Overdue Books
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="h-auto w-full bg-white mx-5 p-5 mt-5 rounded-xl shadow">
              <p className="center text-lg font-bold text-center my-3">
                Registered Users
              </p>
              <CanvasJSChart options={options} />
            </div>

            <div className="bg-white mx-5 w-1/2 mt-5 rounded-xl shadow flex flex-col">
              <p className="text-xl font-bold text-center mt-10">Top Borrower</p>
              <div className="p-10">
                {topStudents.map(([student, count], index) => (
                  <p key={index} className="mt-5 p-3 w-full bg-gray rounded-md text-black flex justify-between">
                    {`${index + 1}. ${student}`} <span>{`${count}`}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SA_Dashboard;
