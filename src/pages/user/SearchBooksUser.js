import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { BiSearch } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

const UserSearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const categories = [
    "All",
    "History and Geography",
    "Literature",
    "Psychology and Philosophy",
    "Natural Sciences",
    "Fiction",
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await supabase.from("books").select("*");
        setBooks(data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  const filteredData = books.filter(
    (book) =>
      (selectedCategory === "All" || book.category === selectedCategory) &&
      (
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="px-5 flex-1">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="black" size={50} />
        </div>
      ) : (
        <div className="book-search-table">
          {/* Search bar and category dropdown */}
          <div className="bg-white my-5 px-2 py-2 rounded-lg shadow flex justify-between search-container">
            <div className="flex items-center w-full">
              <BiSearch className="text-3xl mx-2 my-2 sm:text-4xl" />
              <input
                type="text"
                placeholder="Search"
                className="w-3/4 px-4 py-2 border border-opacity-25 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              id="category"
              name="category"
              className="w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm sm:text-sm"
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

          {/* Table of books */}
          <div className="admin-table overflow-y-auto rounded-lg custom-scrollbar">
            <table className="bg-white w-full px-2 py-3 shadow-xl">
              <thead>
                <tr className="text-left text-black text-lg border-b border-gray">
                  <th className="px-5 py-4">DDC ID</th>
                  <th className="px-5 py-4">Title of the book</th>
                  <th className="px-5 py-4">Author</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.sort((a, b) => parseFloat(a.ddc_id) - parseFloat(b.ddc_id)).map((book) => (
                  <tr key={book.id} className="border-b border-gray text-sm">
                    <td className="px-5 py-2">{book.ddc_id}</td>
                    <td className="px-5 py-2">{book.title}</td>
                    <td className="px-5 py-2">{book.author}</td>
                    <td className="px-5 py-2">{book.category}</td>
                    <td
                      className={`px-1 py-2 text-center ${
                        book.availability ? "bg-green text-black" : "bg-red text-white"
                      } m-2 inline-block rounded-xl text-sm w-3/4`}
                    >
                      {book.availability ? "Available" : "Not Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchBooks;
