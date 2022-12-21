import React, { memo } from "react";
import style from "./Pocket.module.css";
interface Props {
    totalAmount:number
}

const Pocket:React.FC<Props> = ({totalAmount}) => {
    return (
        <span className={style.basic}>
            <span className={style.img_Box}>
                <img src={require("../../../assets/image/pocket.png")} alt=""/>
            </span>
            <span className={`${style.totalAmount} ${totalAmount ? style.show : style.not_Show}`}>{totalAmount > 99 ? "99+" : totalAmount}</span>
        </span>
    );
};

export default memo(Pocket);