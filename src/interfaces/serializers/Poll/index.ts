import { IPoll } from 'models-ts';

const _serializeSingle = (data: IPoll): IPoll => {
    return data;
};

export default class {
    serialize(data: IPoll | IPoll[]) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingle);
        }
        return _serializeSingle(data);
    }
}
