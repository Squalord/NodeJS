'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {

        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.login();
    }
};
