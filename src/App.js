import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState(
    localStorage.getItem("projects") !== null
      ? JSON.parse(localStorage.getItem("projects"))
      : [
          {
            id: Date.now(),
            title: "Project Tracker",
            description: `A simple time-tracking application using ReactJs.The application will have two modules: Projects and Tasks.
            The application should have a provision to:
            1. Create a project with it's name as an input and submit to display them on a listing page.
            2. Create a task and submit this entry to a listing page`,
            tasks: [
              {
                id: Date.now(),
                title: "Create Project Module",
                description:
                  "Create a module to add a new project and show the list of the projects",
                duration: 1
              },
              {
                id: Date.now() + "2nd",
                title: "Create Task Module",
                description:
                  "Create a module to add a new task to the selected project and show the list of the projects",
                duration: 1
              }
            ]
          }
        ]
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tasks: []
  });
  const [selectedProject, setSelectedProject] = useState({});
  function addProject(event) {
    event.preventDefault();
    formData.id = Date.now();
    setProjects([...projects, formData]);
    setFormData({
      title: "",
      description: ""
    });
  }

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-name">Project Tracker</h1>
      </header>
      <main className="container pt-4 pb-4">
        <div className="container">
          <form onSubmit={addProject}>
            <h2 className="text-primary">Add Project</h2>
            <div className="mb-3">
              <label htmlFor="Project Title" className="form-label">
                Project Title
              </label>
              <input
                type="text"
                className="form-control"
                id="Project Title"
                value={formData.title}
                onChange={(event) => {
                  setFormData({ ...formData, title: event.target.value });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Project Description" className="form-label">
                Project Description
              </label>
              <textarea
                className="form-control"
                id="Project Description"
                rows="3"
                value={formData.description}
                onChange={(event) => {
                  setFormData({ ...formData, description: event.target.value });
                }}
                required
              ></textarea>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </div>
          </form>
          <div>
            <h2 className="text-primary">Projects</h2>
            <div className="list-group">
              {projects.length < 1 ? (
                <span className="text-danger p-1">No Projects</span>
              ) : null}
              {projects.map((project) => {
                return (
                  <div
                    className="list-group-item list-group-item-action flex-column align-items-start animated animatedFadeInUp fadeInUp"
                    role="button"
                    key={project.id}
                    data-bs-toggle="modal"
                    data-bs-target="#projectModal"
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                  >
                    <div
                      className="d-flex w-100 justify-content-between"
                      key={project.id}
                    >
                      <h5 className="mb-1">{project.title}</h5>
                      <small className="text-muted">
                        {Array.isArray(project.tasks)
                          ? project.tasks.reduce(function (acc, obj) {
                              return acc + obj.duration;
                            }, 0)
                          : 0}
                        hrs
                      </small>
                    </div>
                    <p className="mb-1">{project.description}</p>
                    <small className="text-muted">
                      Total Tasks:{" "}
                      {Array.isArray(project.tasks) ? project.tasks.length : 0}
                    </small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ProjectModal
          project={selectedProject}
          projects={projects}
          setProjects={setProjects}
        />
      </main>
    </div>
  );
}

function ProjectModal({ project, projects, setProjects }) {
  const [tasks, setTasks] = useState(project.tasks);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 0
  });
  function addTask(event) {
    event.preventDefault();
    formData.id = Date.now();
    tasks.push(formData);
    setFormData({
      title: "",
      description: "",
      duration: 0
    });
    setProjects(
      projects.map((p) => {
        if (p.id === project.id) {
          p.tasks = project.tasks;
        }
        return p;
      })
    );
  }

  useEffect(() => {
    setTasks(project.tasks);
  }, [project.tasks]);

  useEffect(() => {
    setProjects(
      projects.map((p) => {
        if (p.id === project.id) {
          p.tasks = tasks;
        }
        return p;
      })
    );
    // eslint-disable-next-line
  }, [tasks]);

  return (
    <div
      className="modal fade"
      id="projectModal"
      tabIndex="-1"
      aria-labelledby="projectModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="projectModalLabel">
              {project.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addTask}>
              <h4 className="text-primary">Add Task</h4>
              <div className="mb-3">
                <label htmlFor="Task" className="form-label">
                  Task
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Task"
                  value={formData.title}
                  onChange={(event) => {
                    setFormData({ ...formData, title: event.target.value });
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Duration" className="form-label">
                  Duration in hours
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Duration"
                  value={formData.duration}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      duration: Number(event.target.value)
                    });
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  rows="3"
                  value={formData.description}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      description: event.target.value
                    });
                  }}
                  required
                ></textarea>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
            </form>

            <div>
              <h4 className="text-primary">Tasks</h4>
              <div className="list-group">
                {Array.isArray(tasks) && tasks.length < 1 ? (
                  <span className="text-danger p-1">No Tasks</span>
                ) : null}
                {Array.isArray(tasks) &&
                  tasks.map((task) => {
                    return (
                      <div
                        className="list-group-item list-group-item-action flex-column align-items-start animated animatedFadeInUp fadeInUp"
                        key={task.id}
                      >
                        <div
                          className="d-flex w-100 justify-content-between"
                          key={task.id}
                        >
                          <h5 className="mb-1">{task.title}</h5>
                          <small className="text-muted">
                            {task.duration}
                            hrs
                          </small>
                        </div>
                        <p className="mb-1">{task.description}</p>
                        <small>
                          <div
                            role="button"
                            className="text-danger d-flex justify-content-end"
                            onClick={() => {
                              setTasks(tasks.filter((t) => t.id !== task.id));
                            }}
                          >
                            Delete
                          </div>
                        </small>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div
              role="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setProjects(projects.filter((p) => p.id !== project.id));
              }}
            >
              Delete Project
            </div>
            <div
              role="button"
              className="btn btn-primary btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
