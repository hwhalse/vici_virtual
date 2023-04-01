import { UserResolvers } from "./UserResolvers";
import { ExerciseResolvers } from "./ExerciseResolvers";
import { EquipmentResolvers } from "./EquipmentResolvers";
export const resolvers = {
  Query: {
    getAllUsers: UserResolvers.getAllUsers,
    getUserById: UserResolvers.getUserById,
    getAllExercises: ExerciseResolvers.getAllExercises,
    getExerciseByName: ExerciseResolvers.getExerciseByName,
    getAllEquipment: EquipmentResolvers.getAllEquipment,
    getEquipmentByString: EquipmentResolvers.getEquipmentByString,
},
  Mutation: {
    createUser: UserResolvers.createUser,
    updateUserById: UserResolvers.updateUserById,
    createExercise: ExerciseResolvers.createExercise,
  }
};