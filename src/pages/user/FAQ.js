import React, { useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi2";

const faqData = [
  {
    id: 1,
    question: "What are the library's hours of operation?",
    answer:
      "-The library is open from 8 AM to 5 PM from Monday to Saturday. It is closed on Sundays.",
  },
  {
    id: 2,
    question: "How do I search for books in the system?",
    answer:
      "-You can search for books in the library catalog by visiting our website and using the search bar at the top of the page. Enter the title, author, or keywords related to the book and click the search button.",
  },
  {
    id: 3,
    question: "How many personal accounts can I have?",
    answer:
      "-You can have one library account per person. Each account is linked to an individual student number.",
  },
  {
    id: 4,
    question: "Where is my borrowed books history found?",
    answer:
      "-To view your borrowing history, log into your library account on our website. The dashboard will show you your transaction history.",
  },
  {
    id: 5,
    question: "What's the due date for my borrowed books??",
    answer:
      "-After logging into your library account, the dashboard will show you your transaction history and notify you if you missed the return date for a book.",
  },
  {
    id: 6,
    question: "How do I access my library account online?",
    answer:
      "-Visit our library website and log in with the account details provided by the school librarian.",
  },
  {
    id: 7,
    question: "How can I report a lost or damaged library item?",
    answer: "-Contact the library or physically report it to the librarian.",
  },
];

function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="faq-container py-8 mx-5 rounded-lg flex-1">
      <h1 className="text-3xl font-semibold mb-8 text-left">
        Frequently Asked Questions
        <BsQuestionCircleFill className="inline-block mb-1 ml-2" /> { }
      </h1>
      <div className="faq-items">
        {faqData.map((faqItem, index) => (
          <div
            key={faqItem.id}
            className={`faq-item shadow border-black py-3 bg-white my-8 pl-3 rounded-xl ${index === expandedIndex ? " expanded" : ""
              }`}
          >
            <button
              className={`faq-question w-full flex items-center text-left text-lg font-large focus:outline-none ${index === expandedIndex ? " text-blue" : " text-black"
                }`}
              onClick={() => toggleAccordion(index)}
            >
              {faqItem.question}
              <span
                className={`ml-auto transition-transform arrow-icon text-xl mr-3 ${index === expandedIndex ? "rotated" : ""
                  }`}
              >
                <HiChevronDown className="text-lg" />
              </span>
            </button>
            {index === expandedIndex && (
              <div className="faq-answer visible mt-2 text-black pl-3 text-lg">
                {faqItem.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
