import React from 'react';
import Dashboard from "././Component/Dashboard/Dashboard";

import UploadImage from './Uploadimage';
import { BrowserRouter as Router, Route, Routes}from 'react-router-dom';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element=<Dashboard /> />
        <Route  path="/upload" element=<UploadImage /> />
        
      </Routes>
    </Router>
   
  
    </>
  )
}

export default App;