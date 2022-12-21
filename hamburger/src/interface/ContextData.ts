// import { MouseEventHandler } from "react";
import MealDate from "./MealData";

interface Context {
    addMealHandler?:(meal:MealDate,amount:number) => void,
    subMealHandler?:(meal:MealDate,amount:number) => void,
    cleanCartHandler?:() => void
};
export default Context;
