'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    // eslint-disable-next-line @hapi/hapi/scope-start
    static get tableName() {
        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(2).max(300).example('Flobbers').description('Green goo on an adventure'),
            description: Joi.string().min(25).max(5000).example('Blob blob').description('Description of the film'),
            releaseDate: Joi.date().example('2002-01-30').description('Release date of the film'),
            director: Joi.string().min(5).max(200).example('Someone').description('Director of the film'),

            type: Joi.string().min(2).max(100).example('Comedy').description('Type of the film'),
            duration: Joi.string().min(1).max(3).example('90').description('Duration of the film in minutes'),
            createdAt: Joi.date().description('Publication date of the film on the website'),
            updatedAt: Joi.date().description('Update date of the film on the website'),
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
