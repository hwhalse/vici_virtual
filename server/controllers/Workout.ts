import { pool } from '../server';
import { IWorkout, LogWorkoutInput } from '../types/WorkoutType';

export const Workout = {
    create: async (args: {input: IWorkout}): Promise<void | IWorkout> => {
        console.log(args.input.exercises);
        const {name, type, created_by, date, level, exercises} = args.input;
        const query = `INSERT INTO workout (name, type, created_by, date, level, exercises) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [name, type, created_by, date, level, JSON.stringify(exercises)];
        const data = await pool.query(query, values).then((data: any) => data.rows[0]).catch((error: Error) => console.log(error));
        console.log(data)
        return data
    },

    findByUser: async (args: {username: string}): Promise<void | IWorkout> => {
        const username = args.username
        const query = `SELECT * FROM workout WHERE created_by = $1`;
        const values = [username];
        const data = await pool.query(query, values).then((data: any) => data.rows).catch((err: Error) => console.log(err));
        console.log(data);
        return data
    },

    upload: async (args: {input: LogWorkoutInput}): Promise<void | IWorkout> => {
        const {username, results, location, date} = args.input;
        const query = `INSERT INTO workout_log (workout_data, users, date, location) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [{data: results}, username, date, location]
        try {
            const data = await pool.query(query, values);
            const resp = await data.rows[0];
            console.log(resp)
        } catch(err) {
            console.log(err)
        }
    }
}