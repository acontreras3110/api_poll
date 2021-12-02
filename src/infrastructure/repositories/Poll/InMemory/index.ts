/* eslint-disable @typescript-eslint/no-unused-vars */
import { reduce, values } from 'lodash';
import PollRepository from '@/domain/Poll/repository';
import { IPollOptions, IPoll, ID } from 'models-ts';
import pollsMock from '../../../../../__test__/mocks/polls';

export default class extends PollRepository {
	index: number;
	data: any;

	constructor() {
		super();
		this.index = 1;

		this.data = reduce(
			pollsMock,
			(obj, poll) => {
				// @ts-expect-error
				obj[poll.token] = poll;
				return obj;
			},
			{},
		);
	}

	_dataAsArray(): IPoll[] {
		return values(this.data);
	}

	createSingle(poll: IPoll) {
		this.index += 1;
		this.data[this.index] = poll;
	}

	createMultiple(polls: IPoll[]) {
		try {
			polls.forEach((poll) => {
				this.createSingle(poll);
			});
		} catch (e) {
			console.log(e);
			return Promise.reject(e);
		}
	}

	get(projectId: ID, options: IPollOptions): Promise<IPoll> {
		try {
			return Promise.resolve(this.data[options?.where?.token]);
		} catch (e) {
			console.log(e);
			return Promise.reject(e);
		}
	}

	getAll(projectId: ID, options: IPollOptions): Promise<IPoll[]> {
		try {
			let response = this._dataAsArray().filter(
				(poll: any) => poll.projectId == `${projectId}`,
			);

			if (options?.where?.state) {
				response = response.filter(
					(polls) => polls.state == options?.where?.state,
				);
			}

			if (options?.where?.type) {
				response = response.filter(
					(polls) => polls.type == options?.where?.type,
				);
			}

			return Promise.resolve(response);
		} catch (e) {
			console.log(e);
			return Promise.reject();
		}
	}

	create(projectId: ID, data: IPoll | IPoll[]): Promise<IPoll | IPoll[]> {
		try {
			if (Array.isArray(data)) {
				this.createMultiple(data);
			} else {
				this.createSingle(data);
			}
			return Promise.resolve(data);
		} catch (e) {
			console.log(e);
			return Promise.reject();
		}
	}

	delete(projectId: ID, options: IPollOptions): Promise<void> {
		try {
			delete this.data[options?.where?.token];
			return Promise.resolve();
		} catch (e) {
			console.log(e);
			return Promise.reject();
		}
	}
}
