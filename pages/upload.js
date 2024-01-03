import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';

const Upload = () => {
  const [uploadType, setUploadType] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["image/png", "image/jpeg"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Please upload an image (png or jpg).');
    }
  };

  const handleUpload = async () => {
    if (!user) {
      alert('You must be logged in to upload.');
      return;
    }

    if (uploadType === 'image' && file) {
      // Handle image upload
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      let { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return;
      }

      // Insert record into 'uploads' table
      await supabase.from('uploads').insert([
        { title: text, institution: '', user_id: user.id, file_path: filePath, content_type: 'image' },
      ]);
    } else if (uploadType === 'text') {
      // Handle text upload
      await supabase.from('uploads').insert([
        { title: text, institution: '', user_id: user.id, content: text, content_type: 'text' },
      ]);
    }

    // Reset form
    setFile(null);
    setText('');
    alert('Upload successful');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-green-500 flex flex-col items-center pt-8">
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
          <div className="mb-4">
            <label className="inline-block mr-2">Text</label>
            <input 
              type="radio" 
              name="uploadType" 
              value="text" 
              checked={uploadType === 'text'} 
              onChange={() => setUploadType('text')} 
            />
            <label className="inline-block mr-2 ml-4">Image</label>
            <input 
              type="radio" 
              name="uploadType" 
              value="image" 
              checked={uploadType === 'image'} 
              onChange={() => setUploadType('image')} 
            />
          </div>

          {uploadType === 'text' ? (
            <textarea 
              value={text} 
              onChange={handleFileChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded h-64"
              placeholder="Enter your text"
            />
          ) : (
            <div 
              className="w-full h-64 mb-4 border-2 border-dashed border-gray-300 rounded flex justify-center items-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {file ? <p>File ready to upload: {file.name}</p> : <span className="text-gray-500">Drag an image here to upload</span>}
              <input 
                type="file"
                onChange={handleFileChange}
                className="w-full h-full opacity-0"
              />
            </div>
          )}

          {/* Upload button logic here */}
        </div>
      </div>
    </div>
  );
};

export default Upload;
