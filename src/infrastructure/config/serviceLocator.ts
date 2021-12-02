import PollRepository from '@/domain/Poll/repository';
import PollRepositoryFactory from '@/infrastructure/repositories/Poll';
import PollSerializer from '@/interfaces/serializers/Poll';

import logger, { Logger } from '@/infrastructure/logger';
import { SUPPORTED_DATABASE } from './constants';
import environments, { Environment } from './environment';
// import messengerQueue, { MessengerQueue } from '../messengerQueue';

export interface IServiceLocator {
    repositories: {
        poll: PollRepository;
    };
    serializers: {
        poll: PollSerializer;
    };
    // messengerQueue: MessengerQueue;
    environments: Environment;
    logger: Logger;
}

const buildBeans = () => {
    const database =
        environments.env === 'local'
            ? SUPPORTED_DATABASE.IN_MEMORY
            : SUPPORTED_DATABASE.MODELS_PACKAGE;

    const beans: IServiceLocator = {
        repositories: {
            poll: PollRepositoryFactory(database),
        },
        serializers: {
            poll: new PollSerializer(),
        },
        environments,
        logger,
    };

    return beans;
};

export default buildBeans();
