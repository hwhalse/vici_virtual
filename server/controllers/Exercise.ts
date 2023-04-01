import { pool } from '../server';
import { IExercise, ExerciseSearchString } from '../types/ExerciseType';

export const Exercise = {
    create: async (args: {input: IExercise}, ): Promise<void | IExercise> => {
        console.log(args)
        let query;
        const {name, type, posture, movement, symmetry} = args.input
        query = `INSERT INTO exercise (name, type, posture, movement, symmetry) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const values = [name, type, posture, movement, symmetry]
        const data = await pool.query(query, values).then((data: any) => data.rows[0]).catch((error: any) => console.log(error))
        console.log(data)
        if (args.input.equipment) {
            for (const equipment of args.input.equipment) {
                const query = 'SELECT id FROM equipment WHERE name = $1';
                const values = [equipment];
                const result = await pool.query(query, values);
                const equipmentId = result.rows[0].id
                const secondQuery = 'INSERT INTO exercise_equipment (exercise_id, equipment_id) VALUES ($1, $2) RETURNING *'
                const secondValues = [data.id, equipmentId]
                const addJoin = await pool.query(secondQuery, secondValues)
                console.log(addJoin)
            }
        }
        return data
    },

    findAll: async ():Promise<void | IExercise[]> => {
        const query = `SELECT * FROM exercise`;
        return await pool.query(query)
        .then((data:any): Promise<IExercise[]> => data.rows)
        .catch((error:Error):void => console.error(error));
    },

    findByName: async (arg: ExerciseSearchString): Promise<void | IExercise[]> => {
        const nameWithParens = `%${arg.name}%`
        const query = `SELECT exercise.*, ARRAY_AGG(equipment.name) AS equipment
        FROM exercise
        INNER JOIN exercise_equipment
        ON exercise.id = exercise_equipment.exercise_id
        INNER JOIN equipment
        ON exercise_equipment.equipment_id = equipment.id
        WHERE exercise.name ilike $1
        GROUP BY exercise.id`;
        const values = [nameWithParens]
        return await pool.query(query, values).then((data: any): Promise<IExercise[]> => data.rows).catch((error: Error): void => console.log(error))
    }
}
