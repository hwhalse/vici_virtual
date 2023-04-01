import { Request, Response } from "express";
import { Exercise } from "../controllers/Exercise";
import { IExercise } from "../types/ExerciseType";

export const ExerciseResolvers = {
    createExercise: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IExercise> => {
        return Exercise.create(args)
    },
    getAllExercises: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IExercise[]> => {
        return await Exercise.findAll()
    },
    getExerciseByName: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IExercise[]> => {
        return await Exercise.findByName(args)
    },
}