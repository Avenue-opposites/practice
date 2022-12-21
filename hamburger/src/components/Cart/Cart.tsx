import React ,{ Fragment, useState }from "react";
import CartData from "../../interface/CartData";
import Button from "../UI/Button/Button";
import Pocket from "../UI/Pocket/Pocket";
import style from "./Cart.module.css";
import CartDetails from "./CartDetails/CartDetails";
import CheckOut from "./CheckOut/CheckOut";

interface Props {
    cartData:CartData
}
const Cart:React.FC<Props> = (props) => { 
    const {cartData:{items,totalAmount,totalPrice}} = props;
    const [showCartDetails,setShowCartDetails] = useState<boolean>(false);  
    const [isPay,setIsPay] = useState<boolean>(false); 
    const Pay:React.MouseEventHandler = (e:React.MouseEvent) => {
        e.stopPropagation();
        setIsPay(true);
    }
    const cancelPay:React.MouseEventHandler = () => {
        setIsPay(false);
    }
    return (
        <Fragment>
        <div onClick={() => {
            // if(totalAmount === 0) return;
            setShowCartDetails(!showCartDetails)
        }} className={style.basic}>
            <Pocket totalAmount={totalAmount}></Pocket>
            {
                totalAmount > 0 
                ? 
                <span className={style.totalPrice}>
                <i>￥</i>
                <span>{totalPrice}</span>
                </span>
                :
                <span className={style.not_Choose}>未选购商品</span>
            }
            <Button onClick={Pay} shape="round" disabled={!(totalAmount && totalPrice)} float="right">{isPay ? "去支付" :"去结算"}</Button>
        </div>
        {
            isPay 
            ? <CheckOut cancelEvent={cancelPay} cartData={props.cartData}></CheckOut>
            : <CartDetails cover={showCartDetails} cartItems={items}></CartDetails>
        }   
        
        </Fragment>
    );
};

export default Cart;