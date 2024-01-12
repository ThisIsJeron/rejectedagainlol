import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // Adjust the path based on your file structure

const Header = () => {
  const darkMode = false;
  //const [darkMode, setDarkMode] = useState(false);
  /*
  useEffect(() => {
    // Check for saved theme preference in localStorage
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
  }, []);
  
  const handleThemeToggle = () => {
    
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    
  };
  
  useEffect(() => {
    // Apply the theme to the body element
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const { data, error } = supabase.auth.refreshSession()
    const { session, user } = data
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
      authListener.subscription.unsubscribe();
    };
  }, []);
  */
  return (
    <header className={`${darkMode ? 'bg-gray-100' : 'bg-gray-800'} text-white p-4 flex justify-between items-center`}>
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">RejectedAGAIN.lol</span>
      </Link>
      <nav className="flex items-center">
        {/* ... other nav links 
        <button onClick={handleThemeToggle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        */}
        <Link href="/upload">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</span>
        </Link>
        
        {/* ... other nav links 
        {loggedIn ? (
          <span className="text-lg hover:text-gray-300 cursor-pointer">{username}</span>
        ) : (
          <Link href="/login">
            <span className="text-lg hover:text-gray-300 cursor-pointer">Login</span>
          </Link>
        )}
        */}

      </nav>
    </header>
  );
};

export default Header;
