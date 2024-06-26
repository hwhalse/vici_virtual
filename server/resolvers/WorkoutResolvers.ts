import { Request, Response } from 'express';
import { Workout } from '../controllers/Workout';
import { IWorkout } from '../types/WorkoutType';

export const WorkoutResolvers = {
    createWorkout: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IWorkout> => {
        return Workout.create(args);
    },
    getWorkoutByAuthor: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IWorkout[]> => {
        return Workout.findByUser(args)
    },
    getWorkoutById: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IWorkout[]> => {
        return Workout.findById(args)
    },
    uploadWorkout: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IWorkout> => {
        return Workout.upload(args)
    },
    getLoggedWorkouts: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | any[]> => {
        return Workout.findLoggedWorkouts(args)
    },
    searchWorkoutsByName: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | any[]> => {
        return Workout.findByName(args)
    },
}