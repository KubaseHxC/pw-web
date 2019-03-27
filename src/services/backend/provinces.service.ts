import { ProvinceVM } from '../../domain/models';

const get = async (countryId: number): Promise<ProvinceVM[]> => {
  return await fetch(`http://localhost:3001/provinces/${countryId}`, {
    method: 'get'
  }).then(res => res.json().then(parsedResult => parsedResult as ProvinceVM[]));
};

const update = async (province: Partial<ProvinceVM>): Promise<ProvinceVM> => {
  return await fetch(`http://localhost:3001/provinces/${province.id}`, {
    method: 'get',
    body: JSON.stringify(province)
  }).then(res => res.json().then(parsedResult => parsedResult as ProvinceVM));
};

export { get, update };
