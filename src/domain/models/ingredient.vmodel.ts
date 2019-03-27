export class IngredientVM {
    id!: number;
    name!: string;
    description!: string;
    type!: 'simple' | 'dough';
    multiplicity!: number;
    quantity: number = 0;
    selected: boolean = false;
}