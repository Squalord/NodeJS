'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'delete',
        path: '/user',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().min(1).description('Id of the user')
                })
            }
        },
        // eslint-disable-next-line @hapi/hapi/scope-start
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.delete(request.payload);
        }
    },
    {
        method: 'PATCH',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('Kirby').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Star').description('Lastname of the user'),
                    password: Joi.string().min(8).example('poyopoyo').description('Password of the user'),
                    username: Joi.string().min(8).example('Poyoyoyo').description('Username of the user'),
                    email: Joi.string().min(3).example('Dedede@gmail.fr').description('Email of the user'),
                    scope: Joi.string().allow('user','admin').example('user').description('Scope of the user')
                })
            }
        },
        // eslint-disable-next-line @hapi/hapi/scope-start
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.update(request.params.id, request.payload);
        }
    }
];
