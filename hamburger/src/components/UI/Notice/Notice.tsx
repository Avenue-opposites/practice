import React, { memo } from "react";
import {children} from "../../../types/types";
import style from "./Notice.module.css";
interface Props {
    children?:children
}
const Notice:React.FC<Props> = (props) => {
    const {children} = props;
    return(
        <p className={style.notice} {...props}>
            {children}
        </p>
    );
};

export default memo(Notice);