import express, { response } from "express";
import User from "../models/User.js"; 
const chartRoutes = express.Router();

chartRoutes.get("/", async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default chartRoutes;