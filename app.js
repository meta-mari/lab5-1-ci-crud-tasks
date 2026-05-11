const express = require("express");

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Estudiar GitHub Actions", done: false },
  { id: 2, title: "Hacer informe del laboratorio", done: false },
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task no encontrada" });
  }

  return res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  const { title, done = false } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "El campo title es obligatorio" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    done,
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task no encontrada" });
  }

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "El campo title es obligatorio" });
  }

  tasks[taskIndex] = {
    id,
    title,
    done: typeof done === "boolean" ? done : false,
  };

  return res.status(200).json(tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task no encontrada" });
  }

  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);

  return res.status(200).json(deletedTask);
});

app.get("/version", (req, res) => {
  res.status(200).json({ version: "1.0.0" });
});

module.exports = {
  app,
  resetTasks: () => {
    tasks = [
      { id: 1, title: "Estudiar GitHub Actions", done: false },
      { id: 2, title: "Hacer informe del laboratorio", done: false },
    ];
  },
};
