/** @format */

export default interface MealDate {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly price: number;
  img: string;
  amount?:number
}
