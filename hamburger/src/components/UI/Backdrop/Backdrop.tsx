import React, { memo } from "react";
import { children } from "../../../types/types";
import style from "./Backdrop.module.css";
interface Props {
    cover:boolean,
    children?:children
}

const Backdrop:React.FC<Props> = ({cover,children}) => {
    return(
        <div style={{opacity:+cover,pointerEvents:`${cover ? "auto" : "none"}`}} className={style.cover}>
            {children}
        </div>
    );
};

export default memo(Backdrop);