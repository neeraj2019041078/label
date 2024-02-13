import React from 'react';
import Dashboard from "././Component/Dashboard/Dashboard";
import Upload from "././Component/Upload/Upload";
import { BrowserRouter as Router, Route, Routes}from 'react-router-dom';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element=<Dashboard /> />
        <Route exact path="/upload" element=<Upload /> />
        
      </Routes>
    </Router>
   
  
    </>
  )
}

export default App;