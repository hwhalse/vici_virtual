import { equipmentSchema } from "./schemaModules/equipmentSchema";
import { exerciseSchema } from "./schemaModules/exerciseSchema";
import { feedSchema } from "./schemaModules/feedSchema";
import { userSchema } from "./schemaModules/userSchema";
import { workoutSchema } from "./schemaModules/workoutSchema";

export const typeDefs = [workoutSchema, userSchema, exerciseSchema, equipmentSchema, feedSchema];