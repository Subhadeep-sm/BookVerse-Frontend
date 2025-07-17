import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

import BookDetails from './BookDetails';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState('');

  const fetchBooks = async (searchTerm = 'fiction') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${API_BASE}?q=${searchTerm}&maxResults=20`);
      if (data.items && data.items.length > 0) {
        setBooks(data.items);
      } else {
        setBooks([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => fetchBooks(value), 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">BookVerse</h1>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for books..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:outline-none mb-6"
        />

        {selectedBook ? (
          <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
        ) : (
          <>
            {loading && <p className="text-center text-indigo-600">Loading books...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    className="w-full h-56 object-cover rounded"
                  />
                  <h2 className="mt-3 font-semibold text-lg truncate">{book.volumeInfo.title}</h2>
                  <p className="text-sm text-gray-600 truncate">{book.volumeInfo.authors?.join(', ')}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllBooks;