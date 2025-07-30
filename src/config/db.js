import { connect } from "mongoose";
import 'dotenv/config'

export const initMongoDB = async () => {
    try {
        await connect(process.env.MONGO_CONEXION);
    } 
    catch (error) {
        throw new Error("Error al conectar a la base de datos");
    }
};
