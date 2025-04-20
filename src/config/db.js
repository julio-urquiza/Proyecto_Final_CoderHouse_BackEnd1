import { connect } from "mongoose";

export const initMongoDB = async () => {
    try {
        await connect("mongodb+srv://julio_urquiza:coder@codercluster.ku5ol.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=CoderCluster");
    } 
    catch (error) {
        throw new Error("Error al conectar a la base de datos");
    }
};
