const express = require("express");
const server = express();
server.use(express.json());

const projects = [];

let logRequests = 0;

function existIDProject(req, res, next) {
  const { id } = req.params;
  const project = projects.find(parameter => parameter.id == id);
  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }
  return next();
}

function countLogRequests(res, res, next) {
  logRequests++;
  console.log(`Número de requests: ${logRequests}`);
  return next();
}

server.use(countLogRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(project);
});

server.put("/projects/:id", existIDProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(parameter => parameter.id == id);
  project.title = title;
  return res.json(project);
});

server.delete("/projects/:id", existIDProject, (req, res) => {
  const { id } = req.params;

  const indexOfProjectToDelete = projects.findIndex(
    parameter => parameter.id == id
  );
  projects.splice(indexOfProjectToDelete, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", existIDProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const task = projects.find(parameter => parameter.id == id);
  task.tasks.push(title);
  return res.json(projects);
});

server.listen(3000);
