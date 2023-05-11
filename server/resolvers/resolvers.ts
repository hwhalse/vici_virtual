import { UserResolvers } from "./UserResolvers";
import { ExerciseResolvers } from "./ExerciseResolvers";
import { EquipmentResolvers } from "./EquipmentResolvers";
import { WorkoutResolvers } from "./WorkoutResolvers";
import { FeedResolvers } from "./FeedResolvers";
export const resolvers = {
  Query: {
    getUser: UserResolvers.findUser,
    getAllExercises: ExerciseResolvers.getAllExercises,
    getExerciseByName: ExerciseResolvers.getExerciseByName,
    getAllEquipment: EquipmentResolvers.getAllEquipment,
    getEquipmentByString: EquipmentResolvers.getEquipmentByString,
    getWorkoutsByAuthor: WorkoutResolvers.getWorkoutByAuthor,
    getLoggedWorkouts: WorkoutResolvers.getLoggedWorkouts,
    getUserFeed: FeedResolvers.getUserFeed,
    getWorkoutIds: FeedResolvers.getWorkoutIds,
    getWorkoutById: WorkoutResolvers.getWorkoutById,
},
  Mutation: {
    createExercise: ExerciseResolvers.createExercise,
    createWorkout: WorkoutResolvers.createWorkout,
    logWorkout: WorkoutResolvers.uploadWorkout,
    updateStats: UserResolvers.updateStats,
    saveWorkout: FeedResolvers.saveWorkout,
  }
};