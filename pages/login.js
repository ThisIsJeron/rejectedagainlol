import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';

const Login = () => {
  return (
    <div>
        <Header />
        <div className="min-h-screen bg-green-500 flex flex-col justify-center items-center">
        
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
                </button>
                <Link href="/register">
                <span className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800 cursor-pointer">
                    Register
                </span>
                </Link>
            </div>
            </form>
        </div>
        </div>
    </div>
  );
};

export default Login;
