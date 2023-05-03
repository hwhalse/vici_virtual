import { Request, Response } from 'express';
import { User } from '../controllers/User';
import { IUser, UserStats } from '../types/UserType';

/**
 * schema
 * @name createUser
 * @name getAllUsers
 * @name getUserById
 * @name updateUserById
 */
export const UserResolvers = {

    findUser: async (parent:any, args:any, ctx:{req:Request,res:Response}, info:any): Promise<void | IUser> => {
        return User.findByUsername(args);
    },

    updateStats: async (parent:any, args:any, ctx:{req:Request,res:Response}, info:any): Promise<void | UserStats> => {
        return User.updateStats(args);
    },

}