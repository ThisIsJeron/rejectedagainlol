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
    }
    // ... add more posts as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 flex flex-wrap">
        {posts.map(post => (
          <div key={post.id} className="w-full md:w-1/2 px-2 mb-4">
            <div className="max-w-sm mx-auto rounded shadow-lg">
              <img
                className="object-cover rounded-l-lg w-full"
                src={post.imageUrl}
                alt={post.title}
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-2">Institution: {post.institution}</p>
                  <p className="text-gray-600 text-sm">Date: {post.date}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <img src="/oof.svg" alt="React" className="w-4 h-4" />
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
