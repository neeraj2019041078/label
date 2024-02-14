import React from 'react';
import "./index.css";

import { useNavigate } from 'react-router-dom';

const Card = ({ imageUrl, title, description, buttonText, deleteDataset,buttonGo }) => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/upload');
  }

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-sm" src={imageUrl} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      </a>
      <div className="p-2">
        <a href="#">
          <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">{description}</p>
        <div className='button'>
        <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={deleteDataset}>
          {buttonText}
        </button>
        <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>{buttonGo}
        </button>

        </div>
       
      </div>
    </div>
  );
}

export default Card;
