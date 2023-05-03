import { pool } from "../server";
import { IUser } from "../types/UserType";


export const User =  {
    findByUsername: async (args: {username: string}): Promise<void | IUser> => {
        const username = args.username;
        const queryString = `SELECT *, stats.* FROM users INNER JOIN user_stats stats ON users.id = stats.user_id WHERE username = $1 ORDER BY stats.date DESC LIMIT 1`;
        const values = [username]
        try {
            const query = await pool.query(queryString, values)
            const data = query.rows[0];
            return data
        } catch(err) {
            console.log(err)
        }
    },

    updateStats: async (args: {input: UpdateStats}): Promise<void | UpdateStats> => {
        const {id, date, weight, bodyfat, muscleMass} = args.input;
        const queryString = `INSERT INTO user_stats (user_id, date, weight, bodyfat, muscle_mass) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [id, date, weight, bodyfat, muscleMass];
        try {
            const query = await pool.query(queryString, values);
            const data = query.rows[0];
            return data
        } catch(err) {
            console.log(err)
        }
    }
}

interface UpdateStats {
    id: number;
    date: string;
    weight: number;
    bodyfat: number;
    muscleMass: number;
}