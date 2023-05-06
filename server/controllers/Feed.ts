import { pool } from "../server";

export const Feed = {
    getUserFeed: async (args: {id: number}): Promise<any> => {
        const queryString = `SELECT * FROM workout_log 
        WHERE author_id = 
            (SELECT following FROM following 
            WHERE follower = $1)
        ORDER BY date DESC 
        LIMIT 10`;
        const values = [args.id];
        try {
            const query = await pool.query(queryString, values);
            query.rows.forEach((el: any) => el.date = JSON.stringify(el.date))
            return query.rows
        } catch(err) {
            console.log(err)
        }
    }
}