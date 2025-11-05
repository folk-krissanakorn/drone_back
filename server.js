import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// serve mock files statically
app.use('/mock', express.static(path.join(process.cwd(), 'mock')));

const DRONE_URL = process.env.DRONE_URL;
const DRONE_LOG = process.env.DRONE_LOG;
const API_TOKEN = process.env.API_TOKEN;

app.get("/configs/:id", async (req, res) => {
  try {
    const droneID = Number(req.params.id);
    const raw = await fs.readFile(path.join(process.cwd(), 'mock', 'config.json'), 'utf-8');
    const data = JSON.parse(raw);
    const drone = data.data.find(d => Number(d.drone_id) === droneID);
    if (!drone) return res.status(404).json({ message: "Drone not found" });
    const filteredDrone = {
      drone_id: drone.drone_id,
      drone_name: drone.drone_name,
      light: drone.light,
      country: drone.country,
      weight: drone.weight,
      condition: drone.condition
    };
    res.json(filteredDrone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/logs/:id", async (req, res) => {
  try {
    const droneID = Number(req.params.id);
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 12);
    const raw = await fs.readFile(path.join(process.cwd(), 'mock', 'logs.json'), 'utf-8');
    const data = JSON.parse(raw);
    const items = data.items
      .filter(it => Number(it.drone_id) === droneID)
      .sort((a,b) => new Date(b.created) - new Date(a.created));
    const start = (page-1)*perPage;
    const paged = items.slice(start, start+perPage);
    res.json({ items: paged, total: items.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/logs", async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body;
    if (!drone_id || !drone_name || !country || celsius === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const raw = await fs.readFile(path.join(process.cwd(), 'mock', 'logs.json'), 'utf-8');
    const data = JSON.parse(raw);
    const newItem = {
      created: new Date().toISOString(),
      country,
      drone_id,
      drone_name,
      celsius: Number(celsius)
    };
    data.items.unshift(newItem);
    await fs.writeFile(path.join(process.cwd(), 'mock', 'logs.json'), JSON.stringify(data, null, 2), 'utf-8');
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
