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

  // const newUser = new User({
  //   end_year: 2023,
  //   intensity: 5,
  //   sector: "Technology",
  //   topic: "AI",
  //   insight: "AI Trends in 2023",
  //   url: "http://example.com/ai-trends",
  //   region: "Global",
  //   start_year: 2023,
  //   impact: 4,
  //   added: new Date(),
  //   published: new Date(),
  //   country: "Worldwide",
  //   relevance: 4,
  //   pestle: "Technology",
  //   source: "TechNews",
  //   title: "Emerging AI technologies shaping the future",
  //   likelihood: 5,
  // });

  // newUser.save()
  //   .then(savedUser => {
  //     console.log("Saved user:", savedUser);
  //   })
  //   .catch(error => {
  //     console.error("Error saving user:", error);
  //   });

export default chartRoutes;