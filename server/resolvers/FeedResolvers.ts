import { Request, Response } from 'express';
import { Feed } from '../controllers/Feed';

export const FeedResolvers = {
    getUserFeed: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<any> => {
        return await Feed.getUserFeed(args)
    },
    saveWorkout: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<any> => {
        return await Feed.saveWorkout(args)
    },
}