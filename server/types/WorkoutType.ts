import { WorkoutExercise } from "./ExerciseType";

export interface IWorkout {
    name: string;
    created_by: string;
    date: string;
    type: string;
    level: number;
    exercises: WorkoutExercise[];
}

export interface LogWorkoutInput {
    username: string;
    date: string;
    location: string;
    priv: boolean;
    results: WorkoutStats[]
}

interface WorkoutStats {
    name: string
    result: {
        reps: number[]
        weight: number[]
    }
}