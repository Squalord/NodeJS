'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Le monde de Billy').description('Title of the movie'),
            description: Joi.string().min(3).example('bla bla bla, Billy meurt, bla bla, il revient en Bob, blabla, il devient le destructeur de l\'humanité')
            .description('Description of the movie'),
            releaseDate: Joi.date(),
            producer: Joi.string().min(3).example('John87').description('Name of the movie\'s producer'),
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
