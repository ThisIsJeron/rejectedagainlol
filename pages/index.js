import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '@components/Footer';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase
      .from('uploads')
      .select('id, content, imageUrl, institution, rejectionDate, oofs');

    if (error) console.error('Error loading posts', error);
    else setPosts(posts);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const incrementOofs = async (id) => {
    // Get 'oofed' posts from local storage
    let oofedPosts = JSON.parse(localStorage.getItem('oofedPosts')) || [];
  
    // If the post has already been 'oofed', decrement 'oofs' and remove the post from 'oofedPosts'
    if (oofedPosts.includes(id)) {
      // Get the current 'oofs' count
      const { data: currentPost, error: fetchError } = await supabase
        .from('uploads')
        .select('oofs')
        .eq('id', id);
  
      if (fetchError) console.error('Error fetching post', fetchError);
      else if (currentPost[0].oofs > 0) {
        // Only decrement 'oofs' if it's greater than 0
        const { data, error } = await supabase
          .from('uploads')
          .update({ oofs: -1 }, { increment: true })
          .eq('id', id);
  
        if (error) console.error('Error decrementing oofs', error);
        else {
          fetchPosts(); // Refresh the posts data after decrementing
  
          // Remove the 'oofed' post from local storage
          oofedPosts = oofedPosts.filter(oofedPostId => oofedPostId !== id);
          localStorage.setItem('oofedPosts', JSON.stringify(oofedPosts));
        }
      }
    } else {
      // If the post has not been 'oofed', increment 'oofs' and add the post to 'oofedPosts'
      const { data, error } = await supabase
        .from('uploads')
        .update({ oofs: 1 }, { increment: true })
        .eq('id', id);
  
      if (error) console.error('Error incrementing oofs', error);
      else {
        fetchPosts(); // Refresh the posts data after incrementing
  
        // Add the 'oofed' post to local storage
        oofedPosts.push(id);
        localStorage.setItem('oofedPosts', JSON.stringify(oofedPosts));
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="grid grid-cols-1 sm:grid md:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
            <a href="#!" onClick={() => openImageModal(post.imageUrl)}>
              <img
                className="rounded-t-lg cursor-pointer"
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
                Date of Rejection: {post.rejectionDate}
              </p>
            </div>
            <div className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center dark:border-neutral-600 dark:text-neutral-50">
              <div className="mt-2 flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  onClick={() => incrementOofs(post.id)}
                >
                  <img src="/oof.svg" className="w-6 h-6 mr-1" /> count: {post.oofs}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeImageModal}>
          <img src={selectedImage} className="max-w-full max-h-full cursor-pointer" alt="Full Screen" />
        </div>
      )}
      <Footer />
    </div>
  );
  
  
};

export default Home;
