import { pool } from "../server";

export const Feed = {
    getUserFeed: async (args: {id: number}): Promise<any> => {
        console.log(args.id)
        const queryString = `
        SELECT w.*, u.username 
        AS author_name 
        FROM workout_log w 
        INNER JOIN users u 
        ON u.id = w.user_id
        WHERE w.user_id = 
            (SELECT following FROM following 
            WHERE follower = $1)
        AND w.private = false
        ORDER BY w.date DESC 
        LIMIT 10`;
        const values = [args.id];
        try {
            const query = await pool.query(queryString, values);
            query.rows.forEach((el: any) => el.date = JSON.stringify(el.date))
            return query.rows
        } catch(err) {
            console.log(err)
        }
    },

    getSavedWorkoutIDs: async (args: {id: number}): Promise<any> => {
        const id = args.id;
        const queryString = `SELECT workout_id FROM users_saved_workouts WHERE user_id = $1`;
        const values = [id];
        try {
            const data = await pool.query(queryString, values);
            console.log(data.rows)
            return data.rows;
        } catch(err) {
            console.log(err)
        }
    },

    saveWorkout: async (args: {input: any}): Promise<any> => {
        const {user_id, workout_id} = args.input;
        const queryString = `INSERT INTO users_saved_workouts (user_id, workout_id) values ($1, $2) RETURNING *`;
        const values = [user_id, workout_id];
        try {
            const data = await pool.query(queryString, values);
            return data.rows[0]
        } catch(arr) {
            console.log(arr)
        }
    },
}