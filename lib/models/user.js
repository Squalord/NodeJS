'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            username: Joi.string().min(3).example('John87').description('Username of the user'),
            password: Joi.string().min(8).example('********').description('Password of the user'),
            email: Joi.string().min(8).example('john@hotmail.com').description('email of the user'),
            role: Joi.string().min(8).example('user').description('role of the user')
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = { role: 'user' };
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};
