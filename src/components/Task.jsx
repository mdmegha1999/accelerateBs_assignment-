import React, { useState } from 'react';
import './Task.css'; 

const Task = ({ projects}) => {
  const [taskName, setTaskName] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [description, setDescription] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTimeSpentChange = (e) => {
    setTimeSpent(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '' || timeSpent.trim() === '') {
      return;
    }

    console.log('Task Name:', taskName);
    console.log('Time Spent:', timeSpent);
    console.log('Description:', description);

    setTaskName('');
    setTimeSpent('');
    setDescription('');
  };

  return (
    <div className="task-container"> 
      <h2>Create a Task</h2>
      <form className="task-form" onSubmit={handleTaskSubmit}>
        <select className="project-select"> 
          <option value="">Select a Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <input
          type="number"
          placeholder="Time Spent (in hours)"
          value={timeSpent}
          onChange={handleTimeSpentChange}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Task;
