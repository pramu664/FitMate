import bodyParser from "body-parser";
import cors from "cors";
import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import workoutRoutes from "./routers/workouts.js";

// express app
const app = express();

dotenv.config();

// middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
// app.use(express.json());
app.use((req, res, next) => {
    console.log("Hey, I am global middleware.");
    console.log("Path:",req["path"], "Method:",req["method"]);
    next();
})

// routes
app.use("/api/workouts", workoutRoutes);

// Connect to database and listen for requests
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


    