import React, { memo } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import style from "./CheckOut.module.css";
import Meal from "../../Meals/Meal/Meal";
import CartData from "../../../interface/CartData";
import Notice from "../../UI/Notice/Notice";
interface Props {
    cartData:CartData,
    cancelEvent:React.MouseEventHandler
}

const  CheckOut:React.FC<Props> = ({cartData,cancelEvent}) => {
    return (
        <Backdrop cover={true}>
            <div className={style.basic}>
                <div className={style.cancel_Box}>
                    <span onClick={cancelEvent}></span>
                </div>
                <div className={style.CheckOut_Box}>
                    <h2>餐品详情</h2>
                    <div className={style.CheckOut_List}>
                        {
                            cartData.items.length > 0 
                            ? cartData.items.map(meal => (<Meal key={meal.id} isPay={true} meal={meal} isDesc={false}></Meal>))
                            : <Notice>暂无选购商品</Notice>
                        }
                    </div>
                    <p className={style.totalPrice}>
                        合计￥{cartData.totalPrice}
                    </p>
                </div>
            </div>
        </Backdrop>
    );
};

export default memo(CheckOut);