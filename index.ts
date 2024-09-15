import express, { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app: Express = express();

// Allow CORS for your frontend
app.use(cors());

// Proxy setup
app.use(
  "/",
  createProxyMiddleware({
    target: process.env.BASE_URL, // Replace with your API server
    changeOrigin: true,
  })
);

const interval = 30000; // Interval in milliseconds (30 seconds)

function reloadServer() {
  axios
    .get(process.env.APP_URL ?? "")
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadServer, interval);

// Start the server
const port = 3030;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
