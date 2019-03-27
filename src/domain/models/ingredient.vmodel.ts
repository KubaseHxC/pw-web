export class IngredientVM {
    id!: number;
    name!: string;
    description!: string;
    type!: 'simple' | 'dough';
    multiplicity!: number;
    price!: number;
    quantity: number = 0;
    selected: boolean = false;
}