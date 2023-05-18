export const workoutSchema = `
type Query {
    getWorkoutById(id: Int!): Workout
    searchWorkoutsByName(searchString: String): [Workout]
    getWorkoutsByAuthor(id: Int!): [Workout]
    getLoggedWorkouts(user_id: Int!): [LogWorkout]
    getWorkoutIds(id: Int!): [WorkoutIds]
    getWorkoutLikes(workout_id: Int): Int
}
type Workout {
    id: Int
    name: String
    type: String
    creator_id: Int
    created_date: String
    level: Int
    exercises: [WorkoutExercise]
}
type WorkoutExercise {
    name: String
    weight: Int
    work: Int
    rest: Int
    sets: Int
    reps: Int
    equipment: [String]
}
type WorkoutIds {
    workout_id: Int
}
type LogWorkout {
    id: Int
    user_id: Int
    date: String
    private: Boolean
    author_name: String
    location: String
    workout_id: Int
    workout_data: AllWorkouts
}
type AllWorkouts {
    data: [LogWorkoutRes]
}
type LogWorkoutRes {
    name: String
    result: [RepsWeights]
}
type RepsWeights {
    reps: [Int]
    weight: [Int]
}
type LogWorkoutResponse {
    user: String
    location: String
    date: String
}
type Mutation {
    createWorkout(input: CreateWorkoutInput): Workout!
    logWorkout(input: LogWorkoutInput): LogWorkoutResponse
    likeWorkout(input: SaveWorkoutInput): String
    saveWorkout(input: SaveWorkoutInput): String
}
input SaveWorkoutInput {
    user_id: Int
    workout_id: Int
}
input LogWorkoutInput {
    workout_id: Int
    author_id: Int
    date: String
    location: String
    priv: Boolean
    results: [LogWorkoutResults]
}
input LogWorkoutResults {
    name: String
    result: [RepsWeight]
}
input RepsWeight {
    reps: [Int]
    weight: [Int]
}
input CreateWorkoutInput {
    name: String
    type: String
    created_by: String
    date: String
    level: Int
    exercises: [WorkoutExerciseArray]
}
input WorkoutExerciseArray {
    name: String
    weight: Int
    sets: Int
    reps: Int
    work: Int
    rest: Int
    equipment: [String]
}
`