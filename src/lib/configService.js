'use strict';

const dotenv = require('dotenv').config();

class ConfigService {
    get(key, $default = undefined) {
        return process.env[key] || $default;
    }
}

module.exports = new ConfigService();
