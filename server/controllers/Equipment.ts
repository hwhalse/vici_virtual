import {pool} from '../server';
import { IEquipment, SearchString } from '../types/EquipmentType';

export const Equipment = {
    findAll: async (): Promise<void | IEquipment[]> => {
        const query = `SELECT * FROM equipment LIMIT 5`;
        return await pool.query(query).then((data: any) => data.rows).catch((error: Error) => console.log(error))
    },

    findByName: async (args: SearchString): Promise<void | IEquipment[]> => {
        const name = args.name;
        const query = `SELECT * FROM equipment WHERE name = $1`;
        const values = [name];
        return await pool.query(query, values).then((data: any) => data.rows).then((error: Error) => console.log(error))
    },

    findByString: async (args: SearchString): Promise<void | IEquipment[]> => {
        const name = `%${args.name}%`;
        const query = `SELECT * FROM equipment WHERE name ILIKE $1 LIMIT 5`;
        const values = [name];
        return await pool.query(query, values).then((data: any) => data.rows).catch((error: Error) => console.log(error))
    }
}
