require('@babel/register')({
	extensions: ['.ts', '.js'],
});

require('dotenv').config();
const logger = require('./infrastructure/logger');
const initApp = require('./infrastructure/webserver/server');

const main = async () => {
	const app = await initApp();

	const port = process.env.PORT || 3080;

	const server = app.listen(port, () => {
		logger.info(`Listening on port ${port} ...`);
	});

	// Gracefuly shutdown
	process.on('exit', () => {
		console.log('exit');
		server.close(() => {
			console.log('server closed');
			process.exit(0);
		});
	});

	process.on('SIGINT', () => {
		console.log('exit');
		server.close(() => {
			console.log('server closed');
			process.exit(0);
		});
	});

	return server;
};

main();
