export const typeDefs = `#graphql

type User {
  user_id: ID
  first_name: String!
  last_name: String!
  email: String!
  created_at: String!
  updated_at: String!
}

type Query {
  # User Queries
  getAllUsers: [User!]
  getUserById(user_id:ID!): User!
  getAllExercises: [Exercise!]
  getExerciseByName(name: String!): [Exercise!]
  getAllEquipment: [Equipment!]
  getEquipmentByString(name: String!): [Equipment!]
  getWorkoutsByAuthor(username: String!): [Workout]
}

type Mutation {
  # User Mutations
  createUser(input: CreateUserInput!): User!
  updateUserById(input: UpdateUserInput): User!
  createExercise(input: CreateExerciseInput): Exercise!
  createWorkout(input: CreateWorkoutInput): Workout!
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
  duration: Int
  equipment: [String]
}

type Equipment {
  name: String
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
  duration: Int
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
}`;