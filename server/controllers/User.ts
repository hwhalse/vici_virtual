import { pool } from "../server";
import { IUser } from "../types/UserType";


export const User =  {
    findByUsername: async (args: {username: string}): Promise<void | IUser> => {
        const username = args.username;
        const queryString = `SELECT * FROM users WHERE username = $1`;
        const values = [username]
        try {
            const query = await pool.query(queryString, values)
            const data = query.rows[0];
            return data
        } catch(err) {
            console.log(err)
        }
    }
}