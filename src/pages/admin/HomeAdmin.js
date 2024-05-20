import React, { useState, useEffect, useCallback } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { supabase } from '../../utils/supabaseClient';
import { ClipLoader } from 'react-spinners';

const HomeAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [borrowedBooksByDay, setBorrowedBooksByDay] = useState({});
  const [totalIssuedToday, setTotalIssuedToday] = useState(0);
  const [totalAvailable, setTotalavailble] = useState(0);
  const [totalWalkInsToday, setTotalWalkInsToday] = useState(0);
  const [overdueBooks, setOverdueBooks] = useState(0);
  const [newestUsers, setNewestUsers] = useState([]);

  const fetchBorrowedBooks = async () => {
    try {
      const { data, error } = await supabase.from('borrowbooks').select('issue_date');
      if (error) {
        throw error;
      }

      const counts = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
      };

      data.forEach((book) => {
        const dayOfWeek = new Date(book.issue_date).getDay();
        counts[
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
        ]++;
      });

      setBorrowedBooksByDay(counts);
    } catch (error) {
      console.error('Error fetching borrowed books:', error.message);
    }
  };

  const fetchTotalIssuedToday = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase.from('borrowbooks').select('*').eq('issue_date', today);
      if (error) {
        throw error;
      }
      setTotalIssuedToday(data.length);
    } catch (error) {
      console.error('Error fetching total issued today:', error.message);
    }
  };

  const fetchTotalavailableBooks = async () => {
    try {
      const { data, error } = await supabase.from('books').select('*').eq('availability', 'TRUE');
      if (error) {
        throw error;
      }
      setTotalavailble(data.length);
    } catch (error) {
      console.error('Error fetching total available books:', error.message);
    }
  };

  const fetchTotalWalkInsToday = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', today);
      if (error) {
        throw error;
      }
      setTotalWalkInsToday(data.length);
    } catch (error) {
      console.error('Error fetching total walk-ins today:', error.message);
    }
  };

  const fetchOverdueBooks = async () => {
    try {
      const { data, error } = await supabase.from('borrowbooks').select('*').eq('status', 'Overdue');
      if (error) {
        throw error;
      }
      setOverdueBooks(data.length);
    } catch (error) {
      console.error('Error fetching overdue books:', error.message);
    }
  };

  const fetchNewestUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('last_name, first_name, middle_name')
        .order('timestamp', { ascending: false })
        .range(0, 4);
      if (error) {
        throw error;
      }
      setNewestUsers(data);
    } catch (error) {
      console.error('Error fetching newest users:', error.message);
    }
  };

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchBorrowedBooks(),
      fetchTotalWalkInsToday(),
      fetchTotalIssuedToday(),
      fetchTotalavailableBooks(),
      fetchOverdueBooks(),
      fetchNewestUsers(),
    ]);
    setLoading(false);
  }, []); 


  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    height: 400,
    axisY: {
      maximum: 16,
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Sunday', y: borrowedBooksByDay.Sunday || 0, color: '#59adff' },
          { label: 'Monday', y: borrowedBooksByDay.Monday || 0, color: '#59adff' },
          { label: 'Tuesday', y: borrowedBooksByDay.Tuesday || 0, color: '#59adff' },
          { label: 'Wednesday', y: borrowedBooksByDay.Wednesday || 0, color: '#59adff' },
          { label: 'Thursday', y: borrowedBooksByDay.Thursday || 0, color: '#59adff' },
          { label: 'Friday', y: borrowedBooksByDay.Friday || 0, color: '#59adff' },
          { label: 'Saturday', y: borrowedBooksByDay.Saturday || 0, color: '#59adff' },
        ],
      },
    ],
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const hour = currentTime.getHours();
  const username = 'Admin';
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="flex-1">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="black" size={50} />
        </div>
      ) : (
        <div className='admin-dashboard'>
          <div className="p-4 m-5 bg-white rounded-lg shadow mb-3">
            <div className="flex justify-between">
              <div className="Greetings">
                <p className="text-xl font-semibold pr-4">
                  {getGreeting()}, <span className="text-blue">Welcome {username}!👋</span>
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  {currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} |{' '}
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}, {formattedTime}
                </p>
              </div>
            </div>
          </div>

          <div className="statistics-section flex-1">
            <div className="flex justify-between mt-10 mb-8 gap-5">
              <div className="p-12 h-60 w-full bg-white mx-5 rounded-xl shadow">
                <p className="text-4xl text-center mt-5 font-bold">{totalWalkInsToday}</p>
                <p className="center text-lg font-bold text-center my-3">Walk-Ins Today</p>
              </div>

              <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
                <p className="text-4xl text-center mt-5 font-bold">{totalIssuedToday}</p>
                <p className="center text-lg font-bold text-center my-3">Books Borrowed Today</p>
              </div>

              <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
                <p className="text-4xl text-center mt-5 font-bold">{totalAvailable}</p>
                <p className="center text-lg font-bold text-center my-3">Total Available Books</p>
              </div>

              <div className="p-12 h-60 w-full bg-white mr-5 rounded-xl shadow">
                <p className="text-4xl text-center mt-5 font-bold">{overdueBooks}</p>
                <p className="center text-lg font-bold text-center my-3">Overdue Books</p>
              </div>
            </div>

            <div className="flex">
              <div className="h-auto w-full bg-white mx-5 p-5 mt-5 rounded-xl shadow">
                <p className="center text-lg font-bold text-center my-3">Borrowed Books</p>
                <CanvasJSChart options={options} />
              </div>

              <div className="bg-white mx-5 w-1/2 mt-5 rounded-xl shadow flex flex-col">
                <p className="text-xl font-bold text-center mt-10">Newest Users</p>
                <div className="p-5 custom-scrollbar overflow-y-auto max-h-[400px]">
                  <ul>
                    {newestUsers.map((user, index) => (
                      <li className="mt-5 p-3 w-full bg-gray rounded-md text-black flex justify-between" key={index}>
                        {user.last_name}, {user.first_name} {user.middle_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;
