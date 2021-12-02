import { IServiceLocator } from '@/infrastructure/config/serviceLocator';
import { IPoll, ID,IPollOptions } from 'models-ts';

export default (
    projectId: ID,
    data: IPoll,
    options: IPollOptions,
    serviceLocator: IServiceLocator,
): Promise<IPoll> => {
    return serviceLocator.repositories.poll.update(
        projectId,
        options,
        data,
    ) as Promise<IPoll>;
};
