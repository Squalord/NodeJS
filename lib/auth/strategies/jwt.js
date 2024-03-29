'use strict';

module.exports = {
    scheme: 'jwt',
    options: {
        keys: 'random_string',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        // eslint-disable-next-line require-await
        validate: async (artifacts, request, h) => {

            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            };
        }
    }
};
