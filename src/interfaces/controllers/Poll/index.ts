import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import ServiceLocator from '@/infrastructure/config/serviceLocator';

import Get from '@/application/use_cases/Poll/Get';
import GetAll from '@/application/use_cases/Poll/GetAll';
import Create from '@/application/use_cases/Poll/Create';
import Delete from '@/application/use_cases/Poll/Delete';
import Update from '@/application/use_cases/Poll/Update';
import { IPoll } from 'models-ts';

export default class PollController {
	async get(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { options, projectId } = req.params;

			if (!JSON.parse(options)?.where?.token) {
				res.json(Boom.notFound(`Missing 'token' in 'where'`));
				return;
			} else {
				const poll = await Get(
					projectId,
					JSON.parse(options),
					req.serviceLocator,
				);

				if (!poll) {
					res.json(Boom.notFound());
					return;
				}

				const serialize = ServiceLocator.serializers.poll.serialize(poll);

				res.json(serialize);
			}
		} catch (error) {
			console.log(error);
			next(Boom.badImplementation(error + ''));
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { options, projectId } = req.params;

			const polls = await GetAll(
				projectId,
				JSON.parse(options),
				req.serviceLocator,
			);

			if (!polls) {
				res.json(Boom.notFound());
				return;
			}

			const serialize = ServiceLocator.serializers.poll.serialize(polls);

			res.json(serialize);
		} catch (error) {
			next(Boom.badImplementation(error + ''));
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { projectId } = req.params;
			const PollCreated = await Create(
				projectId,
				req.body as IPoll,
				req.serviceLocator,
			);

			const serialize = ServiceLocator.serializers.poll.serialize(PollCreated);

			res.json(serialize);
		} catch (error) {
			console.log('controller > create>', error);
			next(Boom.badImplementation(error + ''));
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { projectId, options } = req.params;

			if (!JSON.parse(options)?.where?.token) {
				res.json(Boom.notFound(`Missing 'token' in 'where'`));
				return;
			} else {
				await Delete(projectId, JSON.parse(options), req.serviceLocator);
				res.json({
					ok: true,
				});
			}
		} catch (error) {
			console.log(error);
			next(Boom.badImplementation(error + ''));
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { projectId, options } = req.params;

			if (!JSON.parse(options)?.where?.token) {
				res.json(Boom.notFound(`Missing 'token' in 'where'`));
				return;
			} else {
				const PollUpdate = await Update(
					projectId,
					req.body as IPoll,
					JSON.parse(options),
					req.serviceLocator,
				);

				const serialize = ServiceLocator.serializers.poll.serialize(PollUpdate);

				res.json(serialize);
			}
		} catch (error) {
			console.log(error);
			next(Boom.badImplementation(error + ''));
		}
	}
}
