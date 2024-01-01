import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        {/* Example Post - You'll replace this with dynamic content */}
        <div className="mb-6 p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Post Title</h2>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>

        {/* Repeat similar blocks for other posts */}
      </div>
    </div>
  );
};

export default Home;
