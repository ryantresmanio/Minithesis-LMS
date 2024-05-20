import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { FiAlertTriangle } from "react-icons/fi";
import Books from "./Books";
import { ClipLoader } from "react-spinners";

const UserDashboard = ({ userFirstName, userStudentNumber }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); 
  const [transactions, setTransactions] = useState([]);
  const [overdueTransactions, setOverdueTransactions] = useState([]);
  const [newBooksAdded, setNewBooksAdded] = useState([]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const fetchData = async () => {
      try {
        const [transactionsResponse, booksResponse] = await Promise.all([
          supabase
            .from("borrowbooks")
            .select("ddc_no, book_title, issue_date, return_date, status")
            .eq("student_no", userStudentNumber),
          supabase
            .from("books")
            .select("id, title, created, author"),
        ]);

        const { data: transactionsData, error: transactionsError } = transactionsResponse;
        if (transactionsError) {
          throw transactionsError;
        }

        const { data: booksData, error: booksError } = booksResponse;
        if (booksError) {
          throw booksError;
        }

        setTransactions(transactionsData);
        const overdue = transactionsData.filter(
          (transaction) => transaction.status === "Overdue"
        );
        setOverdueTransactions(overdue);

        const newBooks = booksData.filter((book) => {
          const createdDate = new Date(book.created);
          const currentDate = new Date();
          const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
          const diffHours = Math.ceil(timeDiff / (1000 * 3600));
          return diffHours <= 24;
        });

        setNewBooksAdded(newBooks);

        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData(); 
    return () => clearInterval(intervalID); 
  }, [userStudentNumber]);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="h-screen flex-1">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="black" size={50} /> 
        </div>
      ) : (
        <div>
          <div className="p-4 m-5 bg-white rounded-lg shadow">
            <div className="flex justify-between">
              <div className="Greetings">
                <p className="text-xl font-semibold pr-4">
                  {getGreeting()}, <span className="text-blue">Welcome {userFirstName}!👋</span>
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  {currentTime.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} |{" "}
                  {currentTime.toLocaleDateString("en-US", { weekday: "long" })}, {formattedTime}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col">
              <Books />
              <div className="flex flex-col my-3">
                <h1 className="ml-5 my-5 text-left text-xl font-bold">Notifications</h1>
                <ul className="custom-scrollbar overflow-y-auto notification-height">
                  {overdueTransactions.map((transaction, index) => (
                    <li key={index} className="text-base ml-5 mt-3 text-black bg-white rounded-lg px-2 py-6 shadow">
                      <div className="flex items-center">
                        <FiAlertTriangle className="text-red mr-3" />
                        <p>
                          <b>
                            <u>{transaction.book_title}</u>
                          </b>{" "}
                          is overdue! Return the book as soon as possible. It was due on{" "}
                          {new Date(transaction.return_date).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                  {newBooksAdded.length > 0 && (
                    newBooksAdded.map((book, index) => (
                      <li key={index} className="text-base ml-5 mt-3 text-black bg-white rounded-lg px-2 py-6 shadow">
                        <div className="flex items-center">
                          <FiAlertTriangle className="text-green mr-3" />
                          <p>
                            <b>
                              <u>{book.title}</u>
                            </b>{" "}
                            by {book.author} is added in the last 24 hours
                          </p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* Right side */}
            <div className="mr-5 ml-5 bg-white rounded-lg p-4 shadow ">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Transaction History</p>
                <div className="transaction-list h-full">
                  {transactions.length === 0 ? (
                    <p className="text-black text-center transaction-space">No transactions made yet.</p>
                  ) : (
                    <div className="transaction-table overflow-y-auto rounded-lg custom-scrollbar">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="text-left text-black text-base border-b border-gray">
                            <th className="px-5 py-4">Book Title</th>
                            <th className="px-5 py-4">DDC No</th>
                            <th className="px-5 py-4">Issue Date</th>
                            <th className="px-5 py-4">Return Date</th>
                            <th className="px-5 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.sort((a, b) => a.return_date - b.return_date).map((transaction) => (
                            <tr key={transaction.transaction_id} className="border-b border-gray text-sm">
                              <td className="px-5 py-2">{transaction.book_title}</td>
                              <td className="px-5 py-2">{transaction.ddc_no}</td>
                              <td className="px-5 py-2">{new Date(transaction.issue_date).toLocaleDateString()}</td>
                              <td className="px-5 py-2">{transaction.return_date ? new Date(transaction.return_date).toLocaleDateString() : 'Not returned yet'}</td>
                              <td className={`px-5 py-2 ${transaction.status === 'Overdue' ? 'text-red' : 'text-black'}`}>{transaction.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
