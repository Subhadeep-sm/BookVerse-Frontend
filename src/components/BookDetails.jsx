import React from 'react';

const BookDetails = ({ book, onBack }) => {
  const info = book.volumeInfo;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <button
        onClick={onBack}
        className="text-indigo-600 font-medium mb-4 hover:underline"
      >
        ← Back to list
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
          alt={info.title}
          className="w-40 h-56 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">{info.title}</h2>
          <p className="text-gray-700 mb-1"><strong>Authors:</strong> {info.authors?.join(', ') || 'N/A'}</p>
          <p className="text-gray-700 mb-1"><strong>Categories:</strong> {info.categories?.join(', ') || 'N/A'}</p>
          <p className="text-gray-700 mb-1"><strong>Rating:</strong> {info.averageRating || 'N/A'}</p>
          <p className="text-gray-700 mb-1"><strong>Pages:</strong> {info.pageCount || 'N/A'}</p>
          <p className="text-gray-700 mb-1"><strong>Language:</strong> {info.language?.toUpperCase() || 'N/A'}</p>
          <p className="text-gray-700 mb-1"><strong>Publisher:</strong> {info.publisher || 'N/A'}</p>
          <p className="text-gray-700 mb-3"><strong>Published:</strong> {info.publishedDate || 'N/A'}</p>
          <p className="text-gray-600 text-sm whitespace-pre-line">{info.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
