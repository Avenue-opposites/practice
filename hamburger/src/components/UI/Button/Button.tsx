import React, { memo } from "react";
import { children } from "../../../types/types";
import style from "./Button.module.css";
type shape = "round" | "circle" | "defalut";
type float = "left" | "right" | "none";

interface Props {
    children:children,
    disabled?:boolean,
    shape?:shape,
    float?:float,
    [prop:string]:unknown
}
const Button:React.FC<Props> = (props) => {
    const {children,disabled = false,shape = "default",float = "none"} = props;
    return (
        <button {...props} disabled={disabled} style={{float}} className={`${style.basic} ${disabled ? style.disabled : style.primary} ${style[shape]}`}>
            {children}
        </button>
    );
};

export default memo(Button);