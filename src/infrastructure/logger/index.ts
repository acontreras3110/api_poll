import {LeveledLogMethod} from "winston";
import winston from "./winston";

export interface Logger {
    info: LeveledLogMethod;
    error: LeveledLogMethod;
    stream: { write: (message: any, encoding: any) => void };
}

export default {
    info: winston.info.bind(winston),
    error: winston.error.bind(winston),
    stream: {
        write: (message: any) => {
            winston.info.bind(winston)(message);
        },
    },
};
