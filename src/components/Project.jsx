import React, { useState } from 'react';
import './Project.css';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === '') {
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName,
    };

    setProjects([...projects, newProject]);
    setProjectName('');
  };

  return (
    <div className="project-container"> 
      <h2>Create a Project</h2>
      <form className="project-form" onSubmit={handleProjectSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Projects List</h2>
      <ul className="project-list"> 
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
