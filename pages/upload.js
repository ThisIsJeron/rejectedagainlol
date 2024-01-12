import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const Upload = () => {
    const [uploadType, setUploadType] = useState('image');
    const [text, setText] = useState('');
    const [institution, setInstitution] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(null);
    const captchaRef = useRef(null);

    const onLoad = () => {
      // this reaches out to the hCaptcha JS API and runs the
      // execute function on it. you can use other functions as
      // documented here:
      // https://docs.hcaptcha.com/configuration#jsapi
      captchaRef.current.execute();
    };

    useEffect(() => {
      if (token)
        console.log(`hCaptcha Token: ${token}`);
    }, [token]);
    /*
  useEffect(() => {
    const { data, error } = supabase.auth.refreshSession()
    const { session, user } = data
    //const session = supabase.auth.session();
    setUser(session?.user || null);
  }, []);
    */
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["image/png", "image/jpeg"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Please upload an image (png or jpg).');
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleInstitutionChange = (e) => {
    setInstitution(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow for the drop event to fire
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && ["image/png", "image/jpeg", "image/webp"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Please upload an image (png, jpg, webp).');
    }
  };

  const handleUpload = async () => {
    try {
      // Check if the date is in the future
      const selectedDate = new Date(date);
      const currentDate = new Date();

      if (!institution.trim()) {
        alert('Please fill in all fields.');
        return;
      }

      if (uploadType === 'text' && !text.trim()) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (isNaN(selectedDate.getTime())) {
        alert('Please select a date.');
        return;
      }

      if (selectedDate > currentDate) {
        alert('The date cannot be in the future.');
        return;
      }

      if (uploadType === 'image' && !file) {
        alert('Please select an image file.');
        return;
      }

      let insertData = {
        //title: text, // Assuming you have a 'title' state or prop
        institution: institution, // Assuming you have an 'institution' state or prop
        contentType: uploadType,
        rejectionDate: selectedDate,
      };
  
      if (uploadType === 'image' && file) {
        // Handle image upload
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`;
        const filePath = `public/${fileName}`;

        let { error: uploadError, data: uploadData } = await supabase.storage.from('banana').upload(filePath, file);

        //const { data } = supabase.storage.from('banana').getPublicUrl(filePath)
        
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }

        insertData.imageUrl = supabase.storage.from('banana').getPublicUrl(filePath).data.publicUrl;

      } else if (uploadType === 'text') {
        insertData.content = text; // Set text content
      }
  
      // Insert record into 'uploads' table
      const { error: insertError } = await supabase.from('uploads').upsert([insertData]);
  
      if (insertError) {
        throw new Error(`Error saving upload info: ${insertError.message}`);
      }
  
      // Reset form
      setFile(null);
      setText('');
      setInstitution('');
      setDate('');
      alert('Upload successful');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center pt-8 bg-gray-100">
        <form name="upload" method="post" data-netlify="true" data-netlify-recaptcha="true">
          <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">

              {/* Tabbed Radio Buttons */}
              <div className="flex mb-4 border-b">
                  <label className={`flex items-center pb-2 cursor-pointer ${uploadType === 'image' ? 'border-b-2 border-green-600' : ''}`}>
                      <input 
                      type="radio" 
                      name="uploadType" 
                      value="image" 
                      checked={uploadType === 'image'} 
                      onChange={() => setUploadType('image')} 
                      className="form-radio h-4 w-4 text-green-600 hidden"
                      />
                      <span className="ml-2">Image</span>
                  </label>
                  <label className={`flex items-center pb-2 mr-4 cursor-pointer ${uploadType === 'text' ? 'border-b-2 border-green-600' : ''}`}>
                      <input 
                      type="radio" 
                      name="uploadType" 
                      value="text" 
                      checked={uploadType === 'text'} 
                      onChange={() => setUploadType('text')}
                      className="form-radio h-4 w-4 text-green-600 hidden"
                      />
                      <span className="ml-2">Text</span>
                  </label>
              </div>

            <input
              type="text"
              value={institution}
              onChange={handleInstitutionChange}
              placeholder="Institution Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
    
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
    
            {uploadType === 'text' ? (
              <textarea
                value={text}
                onChange={handleTextChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded h-64"
                placeholder="Enter your text"
              />
            ) : (
              <div
                className="w-full h-64 mb-4 border-2 border-dashed border-gray-300 rounded flex justify-center items-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
              {file ? <p>File ready to upload: {file.name}</p> : <span className="text-gray-500 text-center">Drag an image here to upload</span>}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full h-full opacity-0"
                />
              </div>
            )}
            <HCaptcha
              sitekey="c3416b97-5edb-4938-837d-fad66e7f5e0a"
              onLoad={onLoad}
              onVerify={setToken}
              ref={captchaRef}
            />

    
            <button
              onClick={handleUpload}
              className="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-4 rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );  
};

export default Upload;