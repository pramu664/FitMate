import express from 'express';

import Workout from '../models/workout.js';
import { getWorkouts, getWorkout } from "../controller/workouts.js";

const router = express.Router();

// url patterns
router.get("/", getWorkouts);
router.get("/:id", getWorkout);


// Post a new workout
router.post("/", async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const newWorkout = await Workout.create({ title, load, reps });
        res.status(200).json(newWorkout);

    } catch(error) {
        res.status(400).json({error: error.message});

    }

});

// Delete a workout
router.delete("/:id", (req, res) => {
    res.json({"message": "Delete a workout"});
});

// Update a workout
router.patch("/:id", (req, res) => {
    res.json({"message": "Update a workout"});
});


export default router;