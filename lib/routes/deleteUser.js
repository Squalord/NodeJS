'use strict';

const Joi = require('joi');

module.exports = {
    method: 'delete',
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
        return await userService.delete(request.params.id);
    }
};
