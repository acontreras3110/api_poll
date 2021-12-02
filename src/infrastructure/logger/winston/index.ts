import {format, createLogger, transports} from 'winston';

const myFormat = format.printf((info) => {
    if (info instanceof Error) {
        return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(format.splat(), format.timestamp(), myFormat),
    defaultMeta: {service: 'project-service'},
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.Console(),
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;
