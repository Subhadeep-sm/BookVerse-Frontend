import React from 'react';
import Navbar from './Navbar';

const BookDetails = ({ book , onBack}) => {
  const info = book.volumeInfo;

  return (
    <>
    <Navbar/>

    <div className="bg-[#1E201E] p-6 rounded-xl text-[#ECDFCC] mt-25">
      <button
              className="absolute top-16 right-4 text-[#ECDFCC] text-4xl hover:text-white"
              onClick={onBack}
            >
              &times;
              {/* ← Go Back */}
            </button>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail || 'https://m.media-amazon.com/images/I/81MmomTwghL._UF1000,1000_QL80_.jpg'}
            alt={info.title}
            className="w-48 h-72 object-cover rounded-lg border border-[#ECDFCC] shadow-lg"
          />
        </div>

        {/* Book Information */}
        <div className="flex flex-col flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-[#ECDFCC]">{info.title}</h2>
          {info.subtitle && (
            <p className="text-lg italic text-gray-400">{info.subtitle}</p>
          )}
          
          <p className="text-sm">
            <span className="font-semibold">Authors:</span> {info.authors?.join(', ') || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Categories:</span> {info.categories?.join(', ') || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Rating:</span> {info.averageRating || 'N/A'} ⭐ ({info.ratingsCount || 0} ratings)
          </p>
          <p className="text-sm">
            <span className="font-semibold">Pages:</span> {info.pageCount || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Language:</span> {info.language?.toUpperCase() || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Publisher:</span> {info.publisher || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Published:</span> {info.publishedDate || 'N/A'}
          </p>
          {info.industryIdentifiers && (
            <p className="text-sm">
              <span className="font-semibold">ISBN:</span>{' '}
              {info.industryIdentifiers.map(id => `${id.type}: ${id.identifier}`).join(', ')}
            </p>
          )}
          {info.printType && (
            <p className="text-sm">
              <span className="font-semibold">Format:</span> {info.printType}
            </p>
          )}
          {info.maturityRating && (
            <p className="text-sm">
              <span className="font-semibold">Maturity Rating:</span> {info.maturityRating}
            </p>
          )}

          {/* Description */}
          <div className="mt-4 max-h-60 overflow-y-auto pr-2 text-sm leading-relaxed text-gray-300">
            {info.description ? info.description : 'No description available.'}
          </div>

          {/* Preview & Info Links */}
          <div className="mt-4 flex gap-3">
            {info.previewLink && (
              <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#697565] text-[#ECDFCC] rounded-lg hover:bg-[#5a6556] transition"
              >
                Preview Book
              </a>
            )}
            {info.infoLink && (
              <a
                href={info.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-transparent border border-[#ECDFCC] text-[#ECDFCC] rounded-lg hover:bg-[#697565] transition"
              >
                More Info
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookDetails;
