import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.listen(process.env.NODE_PORT, () =>
  console.log(`Server is listening on ${process.env.NODE_PORT}`)
);
