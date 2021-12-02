declare namespace Express {
	interface Request {
		serviceLocator: import('@/infrastructure/config/serviceLocator').IServiceLocator;
	}
}
