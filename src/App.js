// App.js
import './App.css';

import React from 'react';
import Project from './components/Project';
import Task from './components/Task';

const App = () => {
  const projects = []; // Initialize with an empty array or load from an API/database

  return (
    <div className="app-container">
      <Project />
      <Task projects={projects} />
    </div>
  );
};

export default App;
