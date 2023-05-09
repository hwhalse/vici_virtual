import { pool } from "../server";

export const Feed = {
    getUserFeed: async (args: {id: number}): Promise<any> => {
        console.log(args.id)
        const queryString = `
        SELECT w.*, u.username 
        AS author_name 
        FROM workout_log w 
        INNER JOIN users u 
        ON u.id = w.author_id
        WHERE w.author_id = 
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
}