import React from 'react';
import Header from '../components/Header';

const Upload = () => {
  return (
    <div className="min-h-screen bg-green-500 flex flex-col items-center pt-8">
      <Header />
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="w-full h-64 mb-4 border-2 border-dashed border-gray-300 rounded flex justify-center items-center">
          <span className="text-gray-500">Drag files here to upload</span>
        </div>

        <input
          type="text"
          placeholder="Institution Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="date"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button className="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
