import React from 'react';
import Header from '../components/Header';

const Home = () => {

  
  // Expanded static data to include three example posts
  const posts = [
    {
      id: 1,
      title: "Post Title 1",
      imageUrl: "/img/1.jpg", // Replace with actual image URL
      institution: "Palantir",
      date: "2023-01-01",
    },
    {
      id: 2,
      title: "Post Title 2",
      imageUrl: "/img/2.jpg", // Replace with actual image URL
      institution: "Otter.ai",
      date: "2023-01-02",
    },
    {
      id: 3,
      title: "Post Title 3",
      imageUrl: "/img/3.jpg", // Replace with actual image URL
      institution: "Anyscale",
      date: "2023-01-03",
    },
    {
      id: 3,
      title: "Post Title 3",
      imageUrl: "/img/3.jpg", // Replace with actual image URL
      institution: "Anyscale",
      date: "2023-01-03",
    },
    {
      id: 1,
      title: "Post Title 1",
      imageUrl: "/img/1.jpg", // Replace with actual image URL
      institution: "Palantir",
      date: "2023-01-01",
    },
    {
      id: 2,
      title: "Post Title 2",
      imageUrl: "/img/2.jpg", // Replace with actual image URL
      institution: "Otter.ai",
      date: "2023-01-02",
    },
    {
      id: 3,
      title: "Post Title 3",
      imageUrl: "/img/3.jpg", // Replace with actual image URL
      institution: "Anyscale",
      date: "2023-01-03",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="grid grid-cols-1 sm:grid md:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
            <a href="#!">
              <img
                className="rounded-t-lg"
                src={post.imageUrl}
                alt={post.title} />
            </a>
            <div className="p-6">
							{/* 
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {post.title}
              </h5>
							*/}
              <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Institution: {post.institution}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Date of Rejection: {post.date}
              </p>
            </div>
            <div className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center dark:border-neutral-600 dark:text-neutral-50">
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <img src="/oof.svg" className="w-6 h-6" /> oof
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Home;
