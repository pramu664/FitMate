import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };
        
        const response = await fetch("http://localhost:5000/api/workouts", {
            "method": "POST",
            "body": JSON.stringify(workout),
            "headers": {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            setTitle("");
            setLoad("");
            setReps("");
            dispatch({"type": "CREATE_WORKOUT", payload: json});
            console.log("New workout added.", json);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Workout</h3>

            <label>Exercise title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

            <label>Load (kg): </label>
            <input type="text" value={load} onChange={(e) => setLoad(e.target.value)} />


            <label>Reps: </label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)}/>

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default WorkoutForm;