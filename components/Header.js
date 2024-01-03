import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // Adjust the path based on your file structure

const { data, error } = await supabase.auth.refreshSession()
const { session, user } = data

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    

    setLoggedIn(!!session);
    if (session) {
      setUsername(session.user.email); // Adjust according to your user attribute
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
      if (session) {
        setUsername(session.user.email); // Adjust according to your user attribute
      } else {
        setUsername('');
      }
    });

    return () => {
      authListener.unsubscribe();
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
