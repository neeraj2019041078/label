import React, { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri'; 
import "./Dashboard.css";
import Card from '../../Card';
import { v4 as uuidv4 } from 'uuid';


const Dashboard = () => {
 
  const [showSidebar, setShowSidebar] = useState(false);
  const [datasets, setDatasets] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addDataset = () => {
    const newDataName = prompt("Enter the name of the new dataset:");
    if (newDataName) {
      const newDataset = {
        id: uuidv4(),
        name: newDataName,
        image: require("../../images/dt.jpg"),
        buttonText: "Delete",
        buttonGo :"Nav"
      };
      setDatasets(prevDatasets => [...prevDatasets, newDataset]);
    }
  };

  const deleteDataset = (id) => {
    const updatedDatasets = datasets.filter(dataset => dataset.id !== id);
    setDatasets(updatedDatasets);
  };

  return (
    <div className='dashboard'>
      <div className='nav'>
        <div className='sidebar-toggle' onClick={toggleSidebar}>
          <RiMenuLine className="menu-icon" />
        </div>
        <h1>Dashboard</h1>
        <hr />
      </div>
      
      {showSidebar && (
        <div className='sidebar'>
          <ul>
            <li><a href="#library">Library</a></li>
            <li onClick={addDataset}><a href="#datasets">Datasets</a></li>
            <li><a href="#machines">Machines</a></li>
            <li><a href="#train">Train</a></li>
            <li><a href="#deploy">Deploy</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </div>
      )}

      <div className='dt'>
        <ul>
          {datasets.map((dataset) => (
            <li key={dataset.id}>
              <div className='datas'>
                <Card imageUrl={dataset.image} buttonGo={dataset.buttonGo} buttonText={dataset.buttonText} title={dataset.name} deleteDataset={() => deleteDataset(dataset.id)} description="Description of the dataset"   />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
