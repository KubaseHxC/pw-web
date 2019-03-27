export class IngredientVM {
    id!: number;
    name!: string;
    description!: string;
    type!: 'simple' | 'dough';
    multiplicity!: number;
    quantity?: number;
    selected: boolean = false;
}