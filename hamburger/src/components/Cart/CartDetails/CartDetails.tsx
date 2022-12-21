/** @format */

import React, { memo, useContext } from "react";
import style from "./CartDetails.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { MealList } from "../../../types/types";
import Meal from "../../Meals/Meal/Meal";
import Context from "../../../context/context";
import ContextData from "../../../interface/ContextData";
import Notice from "../../UI/Notice/Notice";
interface Props {
    cover:boolean
    cartItems:MealList
}

const CartDetails:React.FC<Props> = ({cover,cartItems}) => {
  const context:ContextData = useContext<object>(Context);
  return (
    <Backdrop cover={cover}>
      <div className={style.basic}>
        <div className={style.bar}>
            <h2>餐品详情</h2>
            <button onClick={() => (context.cleanCartHandler && context.cleanCartHandler())}>
                <i></i>
                清空购物车
            </button>
        </div>
        <div className={style.list}>
              {
                cartItems.length > 0 
                ? cartItems.map(meal => (<Meal key={meal.id} isDesc={false} isPay={false} meal={meal}></Meal>))
                : <Notice>暂无选购商品</Notice>
              }  
        </div>
      </div>
    </Backdrop>
  );
};

export default memo(CartDetails);
