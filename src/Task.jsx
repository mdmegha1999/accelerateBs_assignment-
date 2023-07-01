import React, { useState } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleProjectSelect = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTimeSpentChange = (e) => {
    setTimeSpent(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '' && timeSpent.trim() !== '') {
      const newTask = {
        id: Date.now(),
        projectName: selectedProject,
        name: taskName,
        timeSpent: timeSpent,
        description: taskDescription,
      };
      setTasks([...tasks, newTask]);
      setSelectedProject('');
      setTaskName('');
      setTimeSpent('');
      setTaskDescription('');
    }
  };

  return (
    <div>
      <h2>Create a Task</h2>
      <form onSubmit={handleTaskSubmit}>
        <select value={selectedProject} onChange={handleProjectSelect}>
          <option value="">Select a Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <br />
        <input
