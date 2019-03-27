import { CountryVM } from '../../domain/models';

const get = async (): Promise<CountryVM[]> => {
  return await fetch('http://localhost:3001/countries', { method: 'get' }).then(
    res => res.json().then(parsedResult => parsedResult as CountryVM[])
  );
};

export { get };
