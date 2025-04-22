export default class Service {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = async () => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    create = async (body) => {
        try {
            return await this.dao.create(body);
        } catch (error) {
            throw new Error(error);
        }
    };

    update = async (id, body) => {
        try {
            return await this.dao.update(id, body);
        } catch (error) {
            throw new Error(error);
        }
    };
    
    updateOne = async (params, body) => {
        try {
            return await this.dao.updateOne(params, body);
        } catch (error) {
            throw new Error(error);
        }
    }

    delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error);
        }
    };

}  