import pino from "pino";

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    name: 'auth_gate_server',
    level: 'debug'
});