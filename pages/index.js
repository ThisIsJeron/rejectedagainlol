import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '@components/Footer';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false); // State to track image size
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const fetchPosts = async (page) => {
    setLoading(true);
    setIsNextDisabled(false); // Reset the disabled state

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = page * postsPerPage - 1;

    let { data: posts, error } = await supabase
      .from('uploads')
      .select('*') // Adjust the fields according to your needs
      .order('oofs', { ascending: false }) // Order by 'oofs' count
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error loading posts', error);
    } else {
      setPosts(posts);
      // Disable the "Next" button if fewer posts are fetched than the posts per page
      setIsNextDisabled(posts.length < postsPerPage);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageEnlarged(false); // Reset to normal size when opening a new image
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged); // Toggle between normal and enlarged size
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const incrementOofs = async (id) => {
    if (updating) return;  // Prevent further execution if already updating
  
    setUpdating(true);  // Set updating status to true
  
    let oofedPosts = JSON.parse(localStorage.getItem('oofedPosts')) || [];
    const isOofed = oofedPosts.includes(id);
  
    const { data: postData, error: postError } = await supabase
      .from('uploads')
      .select('oofs')
      .eq('id', id)
      .single();
  
    if (postError) {
      console.error('Error fetching post', postError);
      setUpdating(false);  // Reset updating status
      return;
    }
  
    const newOofs = isOofed ? Math.max(0, postData.oofs - 1) : postData.oofs + 1;
    const { error: updateError } = await supabase
      .from('uploads')
      .update({ oofs: newOofs })
      .eq('id', id);
  
    if (updateError) {
      console.error('Error updating oofs', updateError);
      setUpdating(false);  // Reset updating status
      return;
    }
  
    setPosts(posts.map(post => post.id === id ? { ...post, oofs: newOofs } : post));
  
    if (isOofed) {
      oofedPosts = oofedPosts.filter(oofedPostId => oofedPostId !== id);
    } else {
      oofedPosts.push(id);
    }
    localStorage.setItem('oofedPosts', JSON.stringify(oofedPosts));
  
    setUpdating(false);  // Reset updating status
  };

  const incrementReports = async (id) => {
    // Confirm before reporting
    const confirmReport = window.confirm("Are you sure you want to report this post?");
    if (!confirmReport) {
      return; // User clicked 'Cancel', so exit the function
    }
  
    setUpdating(true);  // Set updating status to true
  
    let reportedPosts = JSON.parse(localStorage.getItem('reportedPosts')) || [];
    const isReported = reportedPosts.includes(id);
  
    if (isReported) {
      alert('You have already reported this post.');
      setUpdating(false);  // Reset updating status
      return;  // If the post is already reported by the user, do nothing
    }
  
    const { data: postData, error: postError } = await supabase
      .from('uploads')
      .select('reports')
      .eq('id', id)
      .single();
  
    if (postError) {
      console.error('Error fetching post', postError);
      setUpdating(false);  // Reset updating status
      return;
    }
  
    const newReports = postData.reports + 1;
    const { error: updateError } = await supabase
      .from('uploads')
      .update({ reports: newReports })
      .eq('id', id);
  
    if (updateError) {
      console.error('Error updating reports', updateError);
      setUpdating(false);  // Reset updating status
      return;
    }
  
    // Add the post id to the reportedPosts array and save it in localStorage
    reportedPosts.push(id);
    localStorage.setItem('reportedPosts', JSON.stringify(reportedPosts));
  
    setPosts(posts.map(post => post.id === id ? { ...post, reports: newReports } : post));
    setUpdating(false);  // Reset updating status
    
    alert('Thank you for reporting this post.');
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="grid grid-cols-1 sm:grid md:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
            <a href="#!" onClick={() => openImageModal(post.imageUrl)} className="flex justify-center items-center">
              {post.imageUrl ? (
                <img
                  className="rounded-t-lg cursor-pointer max-w-full h-auto"
                  src={post.imageUrl}
                  alt={post.title}
                />
              ) : (
                <div className="mt-auto border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                  <p className="px-6 py-4 mb-2 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{post.content}</p>
                </div>
              )}
            </a>
            <div className="p-6">
              <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Institution: {post.institution}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Date of Rejection: {post.rejectionDate}
              </p>
            </div>
            <div className="mt-auto border-t-2 border-neutral-100 px-6 py-3 text-center dark:border-neutral-600 dark:text-neutral-50">
              <div className="flex items-center justify-between">
                <div className="flex justify-center flex-grow">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={() => incrementOofs(post.id)}
                  >
                    <img src="/oof.svg" className="w-6 h-6 mr-1" /> count: {post.oofs}
                  </button>
                </div>
                <button className="bg-white rounded" onClick={() => incrementReports(post.id)}>❗</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {loading && hasMore && <div className="justify-center">Loading more posts...</div>}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            className={`max-w-full max-h-full cursor-pointer ${isImageEnlarged ? 'scale-150' : 'scale-150'}`}
            alt="Full Screen"
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal from closing when image is clicked
              toggleImageSize();
            }}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;