import { IServiceLocator } from '@/infrastructure/config/serviceLocator';
import { IPoll, IPollOptions, ID } from 'models-ts';

export default (
	projectId: ID,
	options: IPollOptions,
	serviceLocator: IServiceLocator,
): Promise<IPoll | null> => {
	return serviceLocator.repositories.poll.get(projectId, options);
};
