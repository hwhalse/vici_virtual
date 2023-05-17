export const feedSchema = `
type Query {
    getUserFeed(id: Int!): [LogWorkout]
    getWorkoutLikes(workout_id: Int): Int
}
`