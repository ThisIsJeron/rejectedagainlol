import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // Adjust the path based on your file structure

const Header = () => {
  const darkMode = false;
  //const [darkMode, setDarkMode] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const openAboutModal = () => {
    setAboutModalOpen(true);
  };

  const closeAboutModal = () => {
    setAboutModalOpen(false);
  };
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
        <button onClick={openAboutModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 w-24 h-10">
          About
        </button>
        {aboutModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-black">
                  <h2>About rejected.lol</h2>
                  <p>I was recently rejected again for a full stack softare engineer role and was particularly upset. After talking with friends who were also looking for software engineering roles, we started sharing rejection letters we received and realized it would be really interesting to see the various corporate jargon that we were getting from these rejection letters. This site is dedicated for everyone who is getting rejection letters, whether it's for your job search or college search. It's easy to get demoralized after seeing so many rejection letters, but we all get rejected many times in our lives and it's important to not take these letters personally, and to dust yourself off and get back up. </p>
                  <p>- @jackedtechbro</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={closeAboutModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Link href="/upload">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 h-10">
            Upload
          </button>
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
