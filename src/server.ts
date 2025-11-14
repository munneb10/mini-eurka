import express from "express";
import { ServiceRegistry } from "./registry";

const app = express();
const registry = new ServiceRegistry();

app.use(express.json());

// Register service
app.post("/register", (req, res) => {
  registry.register({ ...req.body, lastHeartbeat: Date.now() });
  res.json({ message: "Registered" });
});

// Send heartbeat
app.post("/heartbeat", (req, res) => {
  const { name, id } = req.body;
  const isAlive = registry.heartbeat(name, id);
  console.log(isAlive);
  res.json({ isAlive });
});

// Discover service
app.get("/discover/:name", (req, res) => {
  const instance = registry.getService(req.params.name);
  instance ? res.json(instance) : res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => console.log("Mini Eureka running on port 3000"));
