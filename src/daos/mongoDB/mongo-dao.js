export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    getAll = async () => {
        try {
        return await this.model.find({});
        } catch (error) {
        throw new Error(error);
        }
    };

    getById = async (id) => {
        try {
        return await this.model.findById(id);
        } catch (error) {
        throw new Error(error);
        }
    };

    create = async (body) => {
        try {
        return await this.model.create(body);
        } catch (error) {
        throw new Error(error);
        }
    };

  getById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw error;
    }
  }
}  