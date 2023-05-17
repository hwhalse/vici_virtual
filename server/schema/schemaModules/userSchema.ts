export const userSchema = `

type Query {
    getUser(username: String!): User!
    findFriends(searchString: String): [User]
}
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
type Mutation {
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
`