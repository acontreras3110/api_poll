import { IServiceLocator } from '@/infrastructure/config/serviceLocator';
import { ID, IPollOptions } from 'models-ts';

export default (
	projectId: ID,
	options: IPollOptions,
	serviceLocator: IServiceLocator,
) => {
	return serviceLocator.repositories.poll.delete(projectId, options);
};
