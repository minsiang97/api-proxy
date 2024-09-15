import express, { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app: Express = express();

// Allow CORS for your frontend
app.use(cors());

// Proxy setup
app.use(
  "/",
  createProxyMiddleware({
    target: "https://qa-interview-test.qa.splytech.dev/api", // Replace with your API server
    changeOrigin: true,
  })
);

// Start the server
const port = 3030;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
