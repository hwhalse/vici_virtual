export const equipmentSchema = `
type Query { 
    getAllEquipment: [Equipment!]
    getEquipmentByString(name: String!): [Equipment!]
}

type Equipment {
    name: String
}
`