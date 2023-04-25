import mongoose from "mongoose";

import Workout from "../models/workout.js";

// Get all workouts
export const getWorkouts = async (req, res) => {

    const all_workouts = await Workout.find({}).sort({createdAt: -1});

    res.status(200).json(all_workouts);
}

// Get single workout
export const getWorkout = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({"error": "No such workout"});
    const workout = await Workout.findById(id)
    if (!workout) res.status(404).json({"error": "no such workout"});
    res.status(200).json(workout);

}

// Create a workout
export const createWorkout = async (req, res) => {

    const { title, reps, body } = req.body;

    try {

        const new_workout  = await Workout.create({title , reps, body});
        res.status(200).json(new_workout);

    } catch (error) {

        res.status(404).json({"error": error.message});

    }

}