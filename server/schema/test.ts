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
}

type Mutation {
  # User Mutations
  createUser(input: CreateUserInput!): User!
  updateUserById(input: UpdateUserInput): User!
  createExercise(input: CreateExerciseInput): Exercise!
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

  type Query {
    ex: Exercise
    eq: Equipment
  }

  type Workout {
    name: String
    created: String
    created_by: String
    exercises: [Exercise]
    difficulty: Int
    notes: String
  }
`;

export const exDefs = `#graphql
type Exercise {
    name: String
    type: String
    focus: String
    bodypart: String
    sets: Int
    reps: Int
    intensity: Int
}
type Query {
    exercises: [Exercise]
}`