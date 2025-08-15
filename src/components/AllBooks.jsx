import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import BookDetails from './BookDetails';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';
const topics = ['fiction', 'science', 'history', 'art', 'travel', 'technology', 'philosophy', 'biography'];

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBook]);

  const fetchBooks = async (searchTerm = '', append = false, start = 0) => {
    setLoading(true);
    setError('');

    try {
      let results = [];

      if (!searchTerm.trim()) {
        // Miscellaneous mode: pick multiple random topics
        const shuffledTopics = [...topics].sort(() => 0.5 - Math.random());
        const selectedTopics = shuffledTopics.slice(0, 4); // pick 4 random topics

        for (let topic of selectedTopics) {
          const { data } = await axios.get(
            `${API_BASE}?q=${topic}&startIndex=${Math.floor(Math.random() * 40)}&maxResults=5`
          );
          if (data.items) results = [...results, ...data.items];
        }
      } else {
        // Search mode with random offset for variety
        const randomOffset = Math.floor(Math.random() * 40);
        const { data } = await axios.get(
          `${API_BASE}?q=${searchTerm}&startIndex=${start + randomOffset}&maxResults=20`
        );
        if (data.items) results = data.items;
      }

      if (results.length > 0) {
        setBooks(prev => {
          const newBooks = append ? [...prev, ...results] : results;
          const seen = new Set();
          return newBooks.filter(book => {
            if (seen.has(book.id)) return false;
            seen.add(book.id);
            return true;
          });
        });
        setHasMore(true);
      } else {
        if (!append) setBooks([]);
        setHasMore(false);
        if (append === false) setError('No results found.');
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    }

    setLoading(false);
  };

  useEffect(() => {
    setStartIndex(0);
    fetchBooks('');
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setStartIndex(0);
      fetchBooks(value, false, 0);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleLoadMore = () => {
    const nextIndex = startIndex + 20;
    setStartIndex(nextIndex);
    fetchBooks(query || '', true, nextIndex);
  };

  return (
    <div className="min-h-screen bg-[#1E201E] text-[#ECDFCC] p-6 font-sans mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Search Bar */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for books..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:outline-none mb-6"
        />

        {loading && books.length === 0 && <p className="text-center text-[#ECDFCC]">Loading books...</p>}
        {error && books.length === 0 && <p className="text-center text-red-500">{error}</p>}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-[#1e201e] text-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-[#ECDFCC] transition-all duration-350 border border-[#ECDFCC]"
              onClick={() => setSelectedBook(book)}
            >
              <div className="relative w-full h-80 mb-3">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'https://m.media-amazon.com/images/I/81MmomTwghL._UF1000,1000_QL80_.jpg'}
                  alt={book.volumeInfo.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-2 right-2 bg-[#697565] text-[#ECDFCC] text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wide shadow-md">
                  BOOK
                </div>
              </div>
              <h2 className="text-lg font-bold text-[#ECDFCC] leading-tight mb-1">{book.volumeInfo.title}</h2>
              <p className="text-sm text-gray-400 mb-2">
                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < Math.round(book.volumeInfo.averageRating || 0) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-300">{book.volumeInfo.averageRating || 0}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">
                <span className="mr-2">
                  Pages: <span className="text-[#ECDFCC]">{book.volumeInfo.pageCount || 'N/A'}</span>
                </span>
                <span>
                  Format: <span className="text-[#ECDFCC]">{book.volumeInfo.printType || 'Book'}</span>
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-1">
                Ratings: <span className="text-[#ECDFCC]">{book.volumeInfo.ratingsCount || 0}</span>
              </div>
              {book.volumeInfo.categories && (
                <div className="mt-2">
                  {book.volumeInfo.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block bg-[#697565] text-[#ECDFCC] font-bold text-xs px-2 py-1 rounded-full mr-2 mt-1"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && books.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-[#697565] text-[#ECDFCC] rounded-lg shadow hover:bg-[#5a6556] disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="fixed inset-0 bg-[#697565]/30 flex items-center justify-center z-50 ">
          <div className="relative bg-[#1E201E]   w-full h-full overflow-y-auto p-6  shadow-lg">
            {/* <button
              className="absolute top-3 right-4 text-[#ECDFCC] text-2xl hover:text-white"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button> */}
            <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
