import { userService } from "../services/user-service.js";
import UserDTO from '../dtos/user-dto.js'

class UserController {
    constructor(service) {
        this.service = service;
    }

    register = async (req, res, next) => {
        try {
            const response = await this.service.register(req.body);
            res.json(response);
        } catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await this.service.login(email, password)
            const token = this.service.generateToken(user)
            res.json({ user, token })
        } catch (error) {
            next(error)
        }
    }

    usuarioFormat = async (req, res, next) => {
        try {
            res.json(new UserDTO(req.user))
        } catch(error) {
            next(error)
        }
    }

    recoverPassword = async (req, res, next) => {
        try {
            const {email} = req.body
            const info = await this.service.mandarTokenRecuperacion(email)
            res.json(info)
        } catch (error) {
            next(error)
        }
    }
    
    changePassword = async (req, res, next) => {
        try {
            const response = await this.service.changePassword(req.user.email,req.body.password)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController(userService);