import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabase'; // Adjust the path based on your file structure

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const session = supabase.auth.session();

    if (session) {
      setLoggedIn(true);
      setUsername(session.user.email); // or any other user attribute
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setLoggedIn(true);
        setUsername(session.user.email); // or any other user attribute
      } else {
        setLoggedIn(false);
        setUsername('');
      }
    });

    return () => {
      listener.unsubscribe();
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">Website Title</span>
      </Link>
      <nav>
        <Link href="/upload">
          <span className="text-lg hover:text-gray-300 mr-4 cursor-pointer">Upload</span>
        </Link>
        {loggedIn ? (
          <span className="text-lg hover:text-gray-300 cursor-pointer">{username}</span>
        ) : (
          <Link href="/login">
            <span className="text-lg hover:text-gray-300 cursor-pointer">Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
