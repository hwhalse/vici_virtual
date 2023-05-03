import { UserResolvers } from "./UserResolvers";
import { ExerciseResolvers } from "./ExerciseResolvers";
import { EquipmentResolvers } from "./EquipmentResolvers";
import { WorkoutResolvers } from "./WorkoutResolvers";
export const resolvers = {
  Query: {
    getUser: UserResolvers.findUser,
    getAllExercises: ExerciseResolvers.getAllExercises,
    getExerciseByName: ExerciseResolvers.getExerciseByName,
    getAllEquipment: EquipmentResolvers.getAllEquipment,
    getEquipmentByString: EquipmentResolvers.getEquipmentByString,
    getWorkoutsByAuthor: WorkoutResolvers.getWorkoutByAuthor,
    getLoggedWorkouts: WorkoutResolvers.getLoggedWorkouts,
},
  Mutation: {
    createExercise: ExerciseResolvers.createExercise,
    createWorkout: WorkoutResolvers.createWorkout,
    logWorkout: WorkoutResolvers.uploadWorkout,
  }
};