import { pool } from '../server';
import { IWorkout } from '../types/WorkoutType';

export const Workout = {
    create: async (args: {input: IWorkout}): Promise<void | IWorkout> => {
        console.log(args.input.exercises);
        const {name, type, created_by, date, level, exercises} = args.input;
        const query = `INSERT INTO workout (name, type, created_by, date, level, exercises) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [name, type, created_by, date, level, JSON.stringify(exercises)];
        const data = await pool.query(query, values).then((data: any) => data.rows[0]).catch((error: Error) => console.log(error));
        console.log(data)
        return data
    }
}