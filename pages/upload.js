import React from 'react';
import Header from '../components/Header';

const Upload = () => {
  return (
    <div>
      <Header />
      <div className="upload-container">
        <input type="text" placeholder="Title of the post" />
        <div className="upload-area">Drag and drop area...</div>
        <input type="text" placeholder="Date" />
        <input type="text" placeholder="Company Name" />
        <button>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
