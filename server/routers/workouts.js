import express from 'express';

import Workout from '../models/workout.js';
import { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } from "../controller/workouts.js";

const router = express.Router();

// url patterns
router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);


export default router;