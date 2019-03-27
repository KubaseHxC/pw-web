import { ProvinceVM } from './province.vmodel';

export class CountryVM {
  id!: number;
  name!: string;
  code!: string;
  tax!: number;
  provinces!: ProvinceVM[];
}
