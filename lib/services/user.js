'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const Mailer = require('../services/email')

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        Mailer.send('welcome', user, ', great to see you!', { discoverURL })
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
        // const { User } = this.server.models();
        // let user = User.query()
        //     .select('email', 'password')
        //     .where('email', 'abi@salem.com')
        //     .where('password', 'pancakes');

        // if (user != null || user != undefined) {
        //     return 'login: "successful"';
        // }
        // else {
        //     return '401 Unauthorized';
        // }

        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: 'John',
                lastName: 'Doe',
                email: 'test@example.com'
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );

        return token;
    }
}
