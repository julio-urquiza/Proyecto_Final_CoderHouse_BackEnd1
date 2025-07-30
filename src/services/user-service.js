import { userDao } from "../daos/mongoDB/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-utils.js";
import jwt from "jsonwebtoken";
import Service from "./service.js";
import { cartService } from "./cart-service.js";
import mandarCorreo from "../utils/mailer.js"
import 'dotenv/config'

class UserService extends Service{
  constructor(dao) {
    super(dao)
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.dao.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);
      // crear carrito
      const carrito = await cartService.create({products:[]})
      if(!carrito) throw new CustomError("El carrito no se pudo crear", 400);
      //crear user
      const response = await this.dao.create({
        ...body,
        product:carrito._id,
        password: createHash(password),
      });
      if (!response) throw new CustomError("Error al registrar usuario", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPassword(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const payload = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      carrito: user.product,
      age: user.age,
      role: user.role
    };
    return jwt.sign(payload, process.env.CLAVE, {
      expiresIn: "20m",
    });
  }

  mandarTokenRecuperacion = async (email) => {
    try {
      //buscar mail la base de datos
      const exists = await this.dao.exists({email:email})
      if(!exists) throw new CustomError("Usuario no registrado", 400)
        
      const token = this.generateTokenRecuperacion(email)
      const info = await mandarCorreo(email,"Token De Recuperación",token)
      return info
    } catch (error) {
      throw error;
    }
  }

  generateTokenRecuperacion = (email) => {
    const payload = {
      email
    };
    return jwt.sign(payload, process.env.CLAVE_RECUPERACION, {
      expiresIn: "60m",
    });
  }

  changePassword = async (email,password) => {
    try {
      const userExist = await this.dao.getByEmail(email);
      const passValid = isValidPassword(password, userExist.password);
      if (passValid) throw new CustomError("No se puede usar una contraseña usada anteriormente", 400);
      const user = await this.dao.updateOne({email:email},{password:createHash(password)} )
      return user
    } catch (error){
      throw error
    }
  }

}

export const userService = new UserService(userDao);