export interface Environment {
	env: string;
	progressQueueURL: string;
}

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
export default ((): Environment => {
	return {
		env: process.env.NODE_ENV ?? 'local',
		progressQueueURL: process.env.PROGRESS_QUEUE_URL ?? '',
	};
})();
