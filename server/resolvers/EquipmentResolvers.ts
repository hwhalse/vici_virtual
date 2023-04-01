import {Request, Response} from 'express';
import { Equipment } from '../controllers/Equipment';
import { IEquipment } from '../types/EquipmentType';

export const EquipmentResolvers = {
    getAllEquipment: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IEquipment[]> => {
        return await Equipment.findAll()
    },
    getEquipmentByString: async (parent: any, args: any, ctx: {req: Request, res: Response}, info: any): Promise<void | IEquipment[]> => {
        return await Equipment.findByString(args)
    },

}