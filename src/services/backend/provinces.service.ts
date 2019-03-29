import { ProvinceVM } from '../../domain/models';
import { BASE_URL } from '../../env';

const update = async (provinceId: number, tax: number): Promise<ProvinceVM> => {
  return await fetch(`${BASE_URL}/provinces/${provinceId}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ additionalTax: tax })
  }).then(res => res.json().then(parsedResult => parsedResult as ProvinceVM));
};

export { update };
