'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    showAll() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(userId) {
        const { User } = this.server.models();
        return User.query().deleteById(userId);
    }

    update(userId) {
        const { User } = this.server.models();
        return User.query().findById(userId)
            .patch({
                firstName: "Abigail",
                lastName: "Williams",
                username: "abi",
                password: "pancakes",
                email: "abi@salem.com",
                role: ["admin"]
            });
    }

    login() {
        const { User } = this.server.models();
        let user = User.query()
            .select('email', 'password')
            .where('email', 'abi@salem.com')
            .where('password', 'pancakes');

        if (user != null || user != undefined) {
            return 'login: "successful"';
        }
        else {
            return '401 Unauthorized';
        }
    }
}
