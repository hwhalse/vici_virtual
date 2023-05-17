export const exerciseSchema = `
type Query { 
    getAllExercises: [Exercise!]
    getExerciseByName(name: String!): [Exercise!]
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

type Mutation { 
    createExercise(input: CreateExerciseInput): Exercise!
}

input CreateExerciseInput {
    name: String!
    type: String!
    posture: String
    movement: String
    symmetry: String
    equipment: [String]
}
`