'use strict';

const Joi = require('joi');

module.exports = {
  method: 'post',
  path: '/user',
  options: {
    auth: false,
    tags: ['api'],
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
        lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
        username: Joi.string().required().min(3).example('John87').description('Username of the user'),
        password: Joi.string().required().min(8).example('*****').description('Password of the user'),
        email: Joi.string().required().min(8).example('john@hotmail.com').description('email of the user'),
        role: Joi.object({role: Joi.string().required().min(3).example('user').description('role of the user')})
      })
    }
  },
  handler: async (request, h) => {

    const { userService } = request.services();

    return await userService.create(request.payload);
  }
};
