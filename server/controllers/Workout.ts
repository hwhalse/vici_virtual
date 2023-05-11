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

    findByUser: async (args: {id: number}): Promise<void | IWorkout[]> => {
        console.log(args)
        const id = args.id
        const queryString = `
        SELECT w.* FROM users_saved_workouts s 
        INNER JOIN workouts w 
        ON s.workout_id = w.id 
        WHERE s.user_id = $1`;
        const values = [id];
        try {
            const data = await pool.query(queryString, values);
            data.rows[0].created_date = JSON.stringify(data.rows[0].created_date)
            console.log(data.rows[0].exercises[0].equipment)
            return data.rows
        } catch(err) {
            console.log(err)
        }

    },

    findById: async (args: {id: number}): Promise<any> => {
        const id = args.id;
        const queryString = `SELECT * from workouts WHERE id = $1`;
        const values = [id];
        try {
            const data = await pool.query(queryString, values);
            return data.rows[0]
        } catch(err) {
            console.log(err)
        }
    },

    upload: async (args: {input: LogWorkoutInput}): Promise<void | IWorkout> => {
        const {workout_id, user_id, results, location, date, priv} = args.input;
        const query = `
        INSERT INTO workout_log (workout_id, workout_data, user_id, date, location, private) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [workout_id, {data: results}, user_id, date, location, priv]
        try {
            const data = await pool.query(query, values);
            const resp = await data.rows[0];
            console.log(resp)
        } catch(err) {
            console.log(err)
        }
    },

    findLoggedWorkouts: async (args: {username: string}): Promise<void | any[]> => {
        const username = args.username;
        console.log(username)
        const queryString = `SELECT * FROM workout_log WHERE users = $1 LIMIT 5`;
        const values = [username];
        try {
            const query = await pool.query(queryString, values);
            console.log(query)
            const results = query.rows;
            console.log(results[3].workout_data)
            return results
        } catch(err) {
            console.log(err)
        }
    }
}