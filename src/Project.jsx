import React, { useState } from 'react';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() !== '') {
      const newProject = {
        id: Date.now(),
        name: projectName,
      };
      setProjects([...projects, newProject]);
      setProjectName('');
    }
  };

  return (
    <div>
      <h2>Create a Project</h2>
      <form onSubmit={handleProjectSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <button type="submit">Create Project</button>
      </form>

      <h2>Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
