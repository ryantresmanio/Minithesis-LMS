import React, { useState, useEffect } from "react";
import Profile from "../../assets/Books.png";

import { supabase } from '../../utils/supabaseClient';

const Books = () => {

const [borrowedBooks, setBorrowedBooks] = useState([]);

useEffect(() => {
  const fetchBorrowedBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('borrowbooks')
        .select('book_title');

      if (error) {
        throw error;
      }

      setBorrowedBooks(data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error.message);
    }
  };

  fetchBorrowedBooks();
}, []);

// Function to count occurrences of each book and find the most borrowed books
const countBooks = () => {
  const bookCounts = {};

  borrowedBooks.forEach(book => {
    const { book_title } = book;
    if (bookCounts[book_title]) {
      bookCounts[book_title]++;
    } else {
      bookCounts[book_title] = 1;
    }
  });

  // Sort books by count in descending order
  const sortedBooks = Object.entries(bookCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4); 

  return sortedBooks;
};

const topBorrowedBooks = countBooks();

return (
  <div className="flex flex-col">
  <h1 className="ml-5 mb-5 text-left text-xl font-bold">Top Books</h1>
  <div className="flex flex-row items-center gap-6 ml-5">
    {topBorrowedBooks.map(([bookTitle]) => (
      <div key={bookTitle} className="bg-white rounded-lg p-5 shadow w-full" style={{ height: "250px" }}>
        <img src={Profile} alt={bookTitle} width="100" height="100" className="m-auto mb-3" />
        <p className="text-center">{bookTitle}</p>
      </div>
    ))}
  </div>
</div>
);
}

export default Books;