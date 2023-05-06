export const typeDefs = `#graphql

type User {
  id: ID
  username: String!
  first_name: String
  last_name: String
  email: String
  weight: Int
  height: String
  birth_date: String
  gender: String
  date: String
  bodyfat: Int
  muscle_mass: Int
}

type Query {
  getUser(username: String!): User!
  getAllExercises: [Exercise!]
  getExerciseByName(name: String!): [Exercise!]
  getAllEquipment: [Equipment!]
  getEquipmentByString(name: String!): [Equipment!]
  getWorkoutsByAuthor(username: String!): [Workout]
  getLoggedWorkouts(username: String!): [LogWorkout]
  getUserFeed(id: Int!): [LogWorkout]
}

type Mutation {
  createExercise(input: CreateExerciseInput): Exercise!
  createWorkout(input: CreateWorkoutInput): Workout!
  logWorkout(input: LogWorkoutInput): LogWorkoutResponse
  updateStats(input: UserStatsInput): Stats
}

input UserStatsInput {
  id: Int
  date: String
  weight: Int
  bodyfat: Int
  muscleMass: Int
}

type Stats {
  id: Int
  date: String
  weight: Int
  bodyfat: Int
  muscleMass: Int
}

type LogWorkout {
  id: Int
  author_id: Int
  date: String
  location: String
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

input LogWorkoutInput {
  username: String
  date: String
  location: String
  results: [LogWorkoutResults]
}

input RepsWeight {
  reps: [Int]
  weight: [Int]
}

input LogWorkoutInput {
  user: String
  date: String
  location: String
  results: [LogWorkoutResults]
}

input LogWorkoutResults {
  name: String
  result: [RepsWeight]
}

input CreateUserInput {
  first_name: String!
  last_name: String!
  email: String!
  password: String!
  confirm_password: String!
}

input CreateExerciseInput {
  name: String!
  type: String!
  posture: String
  movement: String
  symmetry: String
  equipment: [String]
}

input UpdateUserInput {
  user_id: ID!
  first_name: String
  last_name: String
  email: String
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

type Equipment {
  name: String
}

type LogWorkoutResponse {
  user: String
  location: String
  date: String
}

type Exercise {
  id: ID
  name: String
  type: String
  posture: String
  movement: String
  symmetry: String
  equipment: [String]
}

type WorkoutExercise {
  name: String
  weight: Int
  work: Int
  rest: Int
  sets: Int
  reps: Int
  equipment: [Equipment]
}

type Query {
  ex: Exercise
  eq: Equipment
  workout: WorkoutExercise
}

type Workout {
  name: String
  type: String
  created_by: String
  date: String
  level: Int
  exercises: [WorkoutExercise]
}

type WorkoutResults {
  author: String
  location: String
  date: String
  workout: [WorkoutStats]
}

type WorkoutStats {
  name: String
  sets: Int
  reps: Int
}`;