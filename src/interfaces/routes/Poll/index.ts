import { NextFunction, Request, Response, Router } from 'express';
import PollController from '@/interfaces/controllers/Poll';
import { celebrate, Joi, Segments } from 'celebrate';
import { PollModel } from 'models-ts';

const router = Router({ mergeParams: true });
const pollController = new PollController();

router.get(
	'/:options/getall',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			projectId: Joi.string().required(),
			options: Joi.string().required(),
		}),
	}),
	(req: Request, res: Response, next: NextFunction) => {
		pollController.getAll(req, res, next);
	},
);

router.get(
	'/:options',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			projectId: Joi.string().required(),
			options: Joi.string().required(),
		}),
	}),
	(req: Request, res: Response, next: NextFunction) => {
		pollController.get(req, res, next);
	},
);

router.post(
	'/',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			projectId: Joi.string().required(),
		}),
		[Segments.BODY]: Joi.alternatives().try(
			PollModel.schema,
			Joi.array().items(PollModel.schema),
		),
	}),
	(req: Request, res: Response, next: NextFunction) => {
		pollController.create(req, res, next);
	},
);

router.delete(
	'/:options',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			projectId: Joi.string().required(),
			options: Joi.string().required(),
		}),
	}),
	(req: Request, res: Response, next: NextFunction) => {
		pollController.delete(req, res, next);
	},
);

router.put(
	'/:options',
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			projectId: Joi.string().required(),
			options: Joi.string().required(),
		}),
		[Segments.BODY]: Joi.alternatives().try(
			PollModel.schema,
			Joi.array().items(PollModel.schema),
		),
	}),
	(req: Request, res: Response, next: NextFunction) => {
		pollController.update(req, res, next);
	},
);

export default router;
