export interface IExercise {
    id: string;
    name: string;
    type: string;
    posture?: string;
    movement?: string;
    symmetry?: string;
    equipment: string[];
}

export interface ExerciseSearchString {
    name: string
}