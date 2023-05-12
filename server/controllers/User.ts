import { pool } from "../server";
import { IUser, UserStats } from "../types/UserType";


export const User =  {
    findByUsername: async (args: {username: string}): Promise<void | IUser> => {
        const username = args.username;
        const queryString = `SELECT *, stats.* FROM users INNER JOIN user_stats stats ON users.id = stats.user_id WHERE username = $1 ORDER BY stats.date DESC LIMIT 1`;
        const values = [username]
        try {
            const query = await pool.query(queryString, values)
            const data = query.rows[0];
            data.birth_date = JSON.stringify(data.birth_date)
            data.date = JSON.stringify(data.date)
            return data
        } catch(err) {
            console.log(err)
        }
    },

    updateStats: async (args: {input: UserStats}): Promise<void | UserStats> => {
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
    },

    findFriends: async (args: {searchString: string}): Promise<void | any> => {
        const string = args.searchString;
        const queryString = `
        SELECT * FROM users 
        WHERE username 
        ILIKE '%${string}%'`;
        try {
            const data = await pool.query(queryString);
            console.log(data)
            return data.rows;
        } catch(err) {
            console.log(err)
        }
    }
}