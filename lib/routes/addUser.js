'use strict';

const Joi = require('joi');

// requête createUser
module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('Kirby').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Star').description('Lastname of the user'),
            password: Joi.string().required().min(8).example('poyopoyo').description('password of the user'),
            mail: Joi.string().required().min(8).example('Poyo@Kirby.com').description('mail of the user'),
            username: Joi.string().required().example('Poyo').description('username of the user'),
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        const { mailService } = request.services();

        await mailService.mailUserCreation(request.payload);

        return userService.create(request.payload);
    }
};
