import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Fetch random quote from API
  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Save the current quote to the list
  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 flex flex-col items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl  font-bold text-gray-800 text-center mb-6">
          Ron Swanson Quotes
        </h1>

        {/* Quote Card */}
        <div className="mb-6">
          <p className="text-lg text-gray-700 font-medium italic text-center mb-4">
            {quote ? `"${quote}"` : "Fetching a quote..."}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={fetchQuote}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition"
            >
              New Quote
            </button>
            <button
              onClick={saveQuote}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none transition"
            >
              Save Quote
            </button>
          </div>
        </div>

        {/* Saved Quotes Section */}
        {savedQuotes.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Saved Quotes
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedQuotes.map((savedQuote, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300 text-gray-700"
                >
                  {savedQuote}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
