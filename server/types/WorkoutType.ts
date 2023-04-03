import { WorkoutExercise } from "./ExerciseType";

export interface IWorkout {
    name: string;
    created_by: string;
    date: string;
    type: string;
    level: number;
    exercises: WorkoutExercise[];
}