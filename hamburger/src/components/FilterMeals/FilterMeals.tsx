import React,{ useState } from "react";
import style from "./FilterMeals.module.css";
interface Props {
    filterHandler:(value:string) => void
}
const Filter:React.FC<Props> = ({filterHandler}) => {
    const [keyword,setKeyword] = useState<string>(""); 
    const debounceSave = debounce((value:string) => {
        filterHandler(value);
        setKeyword(value);
    },500);
    const onChangeHandler:React.ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        debounceSave(value);
    };
    //防抖
    function debounce(callback:Function,time:number):Function {
        let timer:any;
        return function(...args:Array<any>) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
            }, time);
        };
    };
    return(
        <div className={style.basic}>
            <label id="keyword">
                <span></span>
                <input defaultValue={keyword} onChange={onChangeHandler} id="keyword" type="text" placeholder="请输入关键字"/>
            </label>
        </div>
    )
};  

export default Filter;