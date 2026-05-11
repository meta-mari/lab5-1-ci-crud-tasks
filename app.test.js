const request = require("supertest");
const { app, resetTasks } = require("./app");

beforeEach(() => {
  resetTasks();
});

describe("API CRUD Tasks", () => {
  test("GET /health debe retornar status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /tasks debe retornar la lista de tareas", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("GET /tasks/:id debe retornar una tarea existente", async () => {
    const res = await request(app).get("/tasks/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test("POST /tasks debe crear una nueva tarea", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Subir evidencia al informe", done: false });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Subir evidencia al informe");
  });

  test("PUT /tasks/:id debe actualizar una tarea", async () => {
    const res = await request(app)
      .put("/tasks/1")
      .send({ title: "Estudiar CI", done: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Estudiar CI");
    expect(res.body.done).toBe(true);
  });

  test("DELETE /tasks/:id debe eliminar una tarea", async () => {
    const res = await request(app).delete("/tasks/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test("GET /tasks/:id debe retornar 404 si no existe", async () => {
    const res = await request(app).get("/tasks/999");

    expect(res.statusCode).toBe(404);
  });

  test("GET /version debe retornar la version", async () => {
    const res = await request(app).get("/version");

    expect(res.statusCode).toBe(200);
    expect(res.body.version).toBe("1.0.0");
  });
});
