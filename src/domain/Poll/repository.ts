/* eslint-disable @typescript-eslint/no-unused-vars */
import {IPoll, IPollOptions, ID} from 'models-ts';

export default class {
    get(projectId: ID, options: IPollOptions): Promise<IPoll | null> {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getAll(projectId: ID, options: IPollOptions): Promise<IPoll[]> {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    create(projectId: ID, data: IPoll | IPoll[]): Promise<IPoll | IPoll[]> {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    delete(projectId: ID, options: IPollOptions): Promise<void> {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    update(
        projectId: ID,
        options: IPollOptions,
        data: IPoll | IPoll[],
    ): Promise<IPoll | IPoll[]> {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}
