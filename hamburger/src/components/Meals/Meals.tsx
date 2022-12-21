/** @format */

import React from "react";
import style from "./Meals.module.css";
import Meal from "./Meal/Meal";
import MealData from "../../interface/MealData";

interface Props {
  mealsData:Array<MealData>,
}

const Meals: React.FC<Props> = ({mealsData}) => {
  return (
    <div className={style.basic}>
      {
        mealsData.length 
        ? mealsData.map(meal => <Meal key={meal.id} isDesc={true} meal={meal} isPay={false}></Meal>)
        : <p className={style.fallback}>搜索不到此商品</p>
      }
    </div>
  );
};

export default Meals;
