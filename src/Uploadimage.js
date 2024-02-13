import React, { useState, useRef, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {AnnotationLayer} from "react-image-annotation";

import "./Upload.css";

const UploadImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(() => {
    const storedImages = localStorage.getItem("neeraj_images");
    return storedImages ? JSON.parse(storedImages) : [];
  });
  const [isUploaded, setIsUploaded] = useState(false);
  const [annotation,setAnnotation]= useState([]);

  const fileInputRef = useRef(null);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);


    const readFiles = selectedFilesArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

  
    Promise.all(readFiles).then((dataURLs) => {
      setSelectedImage((prevImages) => [...prevImages, ...dataURLs]);
    });
  };

  const handleUpload = () => {
    setIsUploaded(true);
  };

  const handleRemoveImage = (index) => {
    setSelectedImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    localStorage.setItem("neeraj_images", JSON.stringify(selectedImage));
  }, [selectedImage]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <button
                  className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={handleUpload}
                >
                  Upload
                </button>
                <button
                  className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={openFilePicker}
                >
                  Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  style={{ display: "none" }}
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
      {isUploaded && (
        <div className="images-container">
          <div className="selected-images-header">
            Selected Images ({selectedImage.length})
          </div>
          {selectedImage.map((image, index) => (
            <div className="image" key={index}>
              <img src={image} alt={`Selected Image ${index}`} />
              <AnnotationLayer
                image={image}
                annotations={annotations}
                onChange={setAnnotations}
                selector={{}}
              />
              <button onClick={() => handleRemoveImage(index)}>D</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadImage;
