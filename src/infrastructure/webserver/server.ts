import express, {Application, Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {errors} from 'celebrate';
import Boom from '@hapi/boom';
import fileUpload from 'express-fileupload';
import routes from '../../interfaces/routes';
import packageJson from '../../../package.json';
import logger from '../logger';
import serviceLocator from '../config/serviceLocator';

export default async (): Promise<Application> => {
    const app = express();
    // Parsers
    app.use(fileUpload({createParentPath: true}));
    app.use(express.json({limit: '1mb'}));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    // Service locator
    app.use((req: Request, res: Response, next: NextFunction) => {
        req.serviceLocator = serviceLocator;
        next();
    });

    // CORS
    app.use(
        cors({
            origin: process.env.NODE_ENV === 'local' ? true : '',
            credentials: true,
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            allowedHeaders: ['access-control-allow-origin', 'content-type'],
        }),
    );

    app.use((req, res, next) => {
        res.append(
            'Access-Control-Allow-Methods',
            'GET,HEAD,PUT,PATCH,POST,DELETE',
        );
        res.append(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization,Access-Control-Allow-Methods',
        );
        next();
    });

    app.get('/', (req: Request, res: Response) => {
        res.send(`${packageJson.name} - ${packageJson.version}`);
    });

    // Controllers

    app.use('/:projectId/poll', routes.poll);

    // Handle errors
    app.use(errors());

    app.use(require('morgan')('combined', {stream: logger.stream}));

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        if (Boom.isBoom(error)) {
            res.status(error.output.statusCode).json(error.output);
            return;
        }

        if (error) {
            const {output} = Boom.badImplementation();
            res.status(output.statusCode).json(output);
            return;
        }

        next();
    });

    // Not Found
    app.use((req: Request, res: Response) => {
        res.status(404).send(Boom.notFound().output);
    });

    return app;
};
