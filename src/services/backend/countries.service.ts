import { CountryVM } from '../../domain/models';
import { BASE_URL } from '../../env';

const get = async (): Promise<CountryVM[]> => {
    return await fetch(`${BASE_URL}/countries`, { method: 'get' }).then(res =>
        res.json().then(parsedResult => parsedResult as CountryVM[])
    );
};

export { get };
