import PollRepository from '@/domain/Poll/repository';
import {
	IPoll,
	IPollOptions,
	ID,
	PollModel,
} from 'models-ts';

export default class extends PollRepository {
	async get(projectId: ID, options: IPollOptions): Promise<IPoll | null> {
		try {
			if (
				!options?.where?.projectId ||
				options?.where?.projectId !== projectId
			) {
				options.where.projectId = projectId;
			}

			const result = await PollModel.entity.get(options);
			if (!result) {
				return null;
			}
			return result as IPoll;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	async getAll(projectId: ID, options: IPollOptions): Promise<IPoll[]> {
		try {
			// if (
			// 	options?.include &&
			// 	options?.include[0]?.model &&
			// 	(options?.include[0]?.model.toUpperCase() === 'QUESTION' ||
			// 		options?.include[0]?.model.toUpperCase() === 'QUESTIONS')
			// ) {
			// 	options.include[0].model = QuestionModelSequelize;
			// }

			if (
				!options?.where?.projectId ||
				options?.where?.projectId !== projectId
			) {
				options.where.projectId = projectId;
			}

			const result = await PollModel.entity.getAll(options);
			return result as IPoll[];
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	async create(projectId: ID, data: IPoll | IPoll[]): Promise<IPoll | IPoll[]> {
		try {
			const result = await PollModel.entity.create({ data });
			return result as IPoll;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	async update(
		projectId: ID,
		options: IPollOptions,
		data: IPoll | IPoll[],
	): Promise<IPoll[]> {
		try {
			const result = await PollModel.entity.update({ options, data });
			return result as IPoll[];
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	async delete(projectId: ID, options: IPollOptions): Promise<void> {
		try {
			await PollModel.entity.delete(options);
		} catch (e) {
			console.log(e);
		}
	}
}
