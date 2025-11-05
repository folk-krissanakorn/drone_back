#  Drone Data API Server (Assignment #1 Backend)
This project is a **Backend API Server** designed to manage **Drone Configurations** and **Log Data**.  
It supports the **Frontend Dashboard (Assignment #2)** and is built using **Node.js + Express.js**,  
with JSON files used as a lightweight data storage.

---

##  Project Structure
```
/configs/       # Drone configuration JSON files (e.g. 3001.json)
/logs/          # Drone log data JSON files
server.js       # Main Express server file
package.json    # Project dependencies & scripts
README.md       # Project documentation
```

---

## ⚙️ Installation

1. **Install Node.js & npm**
   > Recommended: Node.js v22+  

2. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd [project-folder]
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

---

## ▶️ Run the Server

Start the backend server locally:
```bash
npm start
```

The server will run on:
```
http://localhost:3000
```

You should see:
```
Server is running on port 3000...
```

---
##  API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **GET** | `/configs/:droneId` | Get configuration data for a specific drone |
| **GET** | `/logs/:droneId` | Get latest 12 log records for a drone |
| **POST** | `/logs` | Add a new log entry |
| **GET** | `/health/status/:id` | Check server  status |

### Example: Get Drone Config
**Request:**
```
GET /configs/3001
```

**Response:**
```json
{
  "drone_id": "3001",
  "drone_name": "DroneAlpha",
  "country": "Thailand",
  "light": "Red",
  "weight": "2500"
}
```

---

##  Deployment (Render.com)

This API Server is deployable as a **Web Service** on [Render](https://render.com).

| Setting | Value |
|----------|--------|
| Environment | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

>  Don’t forget to configure **Environment Variables** (e.g. `PORT`) in Render Dashboard.

---

##  Example Integration (Frontend)

You can connect this API to your **Drone Dashboard Frontend (Assignment #2)** using:
```js
axios.get("https://drone-back-nuhs.onrender.com/logs/3001");
```

---

**Author:** Krissanakorn Punsanguem  
**Version:** 1.0.0  
**License:** MIT  
