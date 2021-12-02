import {IServiceLocator} from '@/infrastructure/config/serviceLocator';
import {IPoll, ID} from 'models-ts';

export default (
    projectId: ID,
    data: IPoll,
    serviceLocator: IServiceLocator,
): Promise<IPoll> => {
    return serviceLocator.repositories.poll.create(
        projectId,
        data,
    ) as Promise<IPoll>;
};
