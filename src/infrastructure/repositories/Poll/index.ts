import { SUPPORTED_DATABASE } from '@/infrastructure/config/constants';
import InMemory from './InMemory';
import ModelsPackage from './ModelsPackage';

export default (database: SUPPORTED_DATABASE) => {
	switch (database) {
		case SUPPORTED_DATABASE.IN_MEMORY:
			return new InMemory();

		case SUPPORTED_DATABASE.MODELS_PACKAGE:
			return new ModelsPackage();

		default:
			throw Error('Database not implemented');
	}
};
