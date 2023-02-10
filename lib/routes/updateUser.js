'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth : {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {

        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.update(request.params.id);
    }
};
