/** @format */

import React, { memo, useContext, Fragment } from "react";
import style from "./Meal.module.css";
import context from "../../../context/context";
import Counter from "../../UI/Counter/Counter";
import MealData from "../../../interface/MealData";
import ContextData from "../../../interface/ContextData";

interface Props {
  meal: MealData;
  isDesc: boolean;
  isPay: boolean;
}

const Meal: React.FC<Props> = ({ meal, isDesc, isPay }) => {
  const { title, content, price, img, amount = 0 } = meal;
  // const [Amount, setAmount] = useState<number>(amount);
  const Context: ContextData = useContext<object>(context);
  const increment: React.MouseEventHandler = () => {
    //如果该方法存在就执行
    Context.addMealHandler && Context.addMealHandler(meal, amount + 1);
    // setAmount((amount) => amount + 1);
  };
  const decrement: React.MouseEventHandler = () => {
    Context.subMealHandler && Context.subMealHandler(meal, amount - 1);
    // setAmount((amount) => amount - 1);
  };
  return (
    <div className={style.basic}>
      <div className={style.img_Box}>
        <img src={require(`${img}`)} alt={title} />
      </div>
      <div className={style.content_Box}>
        <h2 className={style.title}>{title}</h2>
        {isDesc ? <p>{content}</p> : <div className={style.block}></div>}
        <div className={style.priceWrapper}>
          {isPay ? (
            <Fragment>
              <Counter
                amount={amount}
                increment={increment}
                decrement={decrement}
              ></Counter>
              <span className={style.price}>
                <i>￥</i>
                {price * amount}
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className={style.price}>
                <i>￥</i>
                {price}
              </span>
              <Counter
                amount={amount}
                increment={increment}
                decrement={decrement}
              ></Counter>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Meal);
