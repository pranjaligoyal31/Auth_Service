const { User } = require('../models/index');

class UserRepository {

    async create(data) {//function to create a user
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong on repositroy layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                id: userId
        }
    });
        } catch (error) {
            console.log("something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;