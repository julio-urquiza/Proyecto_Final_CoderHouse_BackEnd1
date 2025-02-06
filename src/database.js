import mongoose from "mongoose";

mongoose.connect("mongodb+srv://julio_urquiza:coder@codercluster.ku5ol.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=CoderCluster")
    .then(() => console.log("Conectado a la BBDD"))
    .catch((error) => console.log("Ocurrio un error", error));