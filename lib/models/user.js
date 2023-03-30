'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('Kirby').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Star').description('Lastname of the user'),
            password: Joi.string().min(8).example('poyo').description('password of the user'),
            mail: Joi.string().min(8).example('Poyo@Kirby.com').description('mail of the user'),
            username: Joi.string().example('Poyo').description('username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.string().min(2).example('user').description('role of the user')
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = 'user';
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
