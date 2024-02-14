import React, { useState, useRef, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ImageAnnotator from "./ImageAnnotator";
import "./Upload.css";

const UploadImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(() => {
    const storedImages = localStorage.getItem("neeraj_images");
    return storedImages ? JSON.parse(storedImages) : [];
  });
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [labelInput, setLabelInput] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedImage.length > 0) {
      handleImageSelection(0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neeraj_images", JSON.stringify(selectedImage));
  }, [selectedImage]);

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
      setSelectedImageIndex(null);
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
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    }
  };

  const handleImageSelection = (index) => {
    setSelectedImageIndex(index);
    setModalImage(selectedImage[index]);
    setIsModalOpen(true);
  };

  const handleAnnotationSelection = (annotation) => {
    setSelectedAnnotation(annotation);
  };

  const handleLabelInputChange = (event) => {
    setLabelInput(event.target.value);
  };

  const handleAddLabel = () => {
    if (selectedAnnotation && labelInput.trim() !== "") {
      const updatedAnnotations = [
        ...annotations,
        { ...selectedAnnotation, data: { text: labelInput } },
      ];
      setAnnotations(updatedAnnotations);
      setLabelInput("");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

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
            <div
              className={`image ${
                selectedImageIndex === index ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleImageSelection(index)}
            >
              <img src={image} alt={`Selected Image ${index}`} />
              <button onClick={() => handleRemoveImage(index)}>D</button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedImageIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>

            <ImageAnnotator
              image={selectedImage[selectedImageIndex]}
              annotations={annotations}
              handleAnnotationSelection={handleAnnotationSelection}
              handleLabelInputChange={handleLabelInputChange}
              handleAddLabel={handleAddLabel}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
