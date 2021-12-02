import { IServiceLocator } from '@/infrastructure/config/serviceLocator';
import { IPollOptions, ID } from 'models-ts';

export default (
	projectId: ID,
	options: IPollOptions,
	serviceLocator: IServiceLocator,
) => {
	return serviceLocator.repositories.poll.getAll(projectId, options);
};
