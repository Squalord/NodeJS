'use strict';

const Joi = require('joi');

// requête createUser
module.exports = {
    method: 'patch',
    path: '/user',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(1).description('Id of the user'),
                firstName: Joi.string().required().min(3).example('Kirby').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Star').description('Lastname of the user'),
                password: Joi.string().required().min(8).example('Poyoyoyo').description('password of the user'),
                mail: Joi.string().required().min(8).example('poyo@kirby.com').description('mail of the user'),
                username: Joi.string().required().example('Kirby').description('username of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.update(request.payload);
    }
};
