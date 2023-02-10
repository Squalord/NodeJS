'use strict';

const Jwt = require('@hapi/jwt');


const token = Jwt.token.generate(
    {
        aud: 'urn:audience:iut',
        iss: 'urn:issuer:iut',
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com'
    },
    {
        key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
        algorithm: 'HS512'
    },
    {
        ttlSec: 14400 // 4 hours
    }
);