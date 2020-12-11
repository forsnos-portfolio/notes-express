'use strict';

class Logger {
    log = (color, type, message) => console.log(color, `[${type}] ${message}`);

    info(message) {
        this.log('\x1b[34m', 'info', message);
    }

    system(message) {
        this.log('\x1b[37m', 'server', message);
    }

    error(message, error) {
        this.log('\x1b[31m', 'error', `${message} ${error}`);
    }
}

module.exports = new Logger();
