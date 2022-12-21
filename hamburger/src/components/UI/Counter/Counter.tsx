/** @format */

import React, { memo,Fragment } from "react";
import style from "./Counter.module.css";
//定义Props接口
interface Props {
  amount: number;
  increment:React.MouseEventHandler,
  decrement:React.MouseEventHandler

}
const Counter: React.FC<Props> = (props) => {
  const { amount = 0,increment,decrement } = props;
  return (
    <span className={style.basic}>
        {/* 如果没有添加就不显示 */}
        {
            amount > 0 && 
            <Fragment>
                <button className={style.decrement} onClick={decrement}></button>
                <span className={style.amount}>{amount}</span>
            </Fragment>
        }
      <button className={style.increment} onClick={increment}></button>
    </span>
  );
};

export default memo(Counter);
