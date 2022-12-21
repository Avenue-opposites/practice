import {ReactNode} from "react";
import MealDate from "../interface/MealData";
//定义子元素类型
type children = ReactNode;
//购物车项目
type MealList = Array<MealDate>;
export type {
    children,
    MealList
}