import React from 'react';
import Link from 'next/link';


const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">RejectedAGAIN.lol</span> {/* Styling for the title */}
      </Link>
      <nav>
        <Link href="/upload">
          <span className="text-lg hover:text-gray-300 mr-4 cursor-pointer">Upload</span> {/* Styling for navigation links */}
        </Link>
        <Link href="/login">
          <span className="text-lg hover:text-gray-300 cursor-pointer">Login</span> {/* Styling for navigation links */}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
