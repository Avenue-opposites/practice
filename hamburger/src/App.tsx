/** @format */

import React, { Component } from "react";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Meals from "./components/Meals/Meals";
import { nanoid } from "nanoid";
import MealData from "./interface/MealData";
import CartData from "./interface/CartData";
import Context from "./context/context";
import Cart from "./components/Cart/Cart";
import { MealList } from "./types/types";

const MEALS_DATA: MealList = [
  {
    id: nanoid(),
    title: "汉堡包",
    content: "百分百纯牛肉搭配爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！",
    price: 12,
    img: "./img/1.png",
  },
  {
    id: nanoid(),
    title: "黑椒汉堡包",
    content: "百分百纯黑椒搭配科技与狠活经典滋味让你无法抵挡！",
    price: 18,
    img: "./img/2.png",
  },
  {
    id: nanoid(),
    title: "奥尔良汉堡包",
    content: "百分百纯奥尔良搭配科技与狠活经典滋味让你无法抵挡！！",
    price: 15,
    img: "./img/3.png",
  },
  {
    id: nanoid(),
    title: "脆皮鸡汉堡包",
    content: "百分百纯脆皮搭配科技与狠活经典滋味让你无法抵挡！",
    price: 13,
    img: "./img/4.png",
  },
  {
    id: nanoid(),
    title: "鸡肉汉堡包",
    content: "百分百纯坤坤搭配科技与狠活经典滋味让你无法抵挡！！",
    price: 14,
    img: "./img/5.png",
  },
  {
    id: nanoid(),
    title: "牛肉汉堡包",
    content: "百分百纯牛子搭配科技与狠活经典滋味让你无法抵挡！",
    price: 19,
    img: "./img/6.png",
  },
  {
    id: nanoid(),
    title: "沙拉汉堡包",
    content: "百分百纯沙拉搭配科技与狠活经典滋味让你无法抵挡！",
    price: 16,
    img: "./img/7.png",
  },
];

interface State {
  mealsData: MealList;
  filterMealsData: MealList;
  cartData: CartData;
}


class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      //原商品数据
      mealsData: MEALS_DATA,
      //过滤商品
      filterMealsData: MEALS_DATA,
      //购物车数据
      cartData: {
        items: [],
        totalAmount: 0,
        totalPrice: 0,
      },
    };
  }
  render() {
    const { filterMealsData, cartData } = this.state;
    const { addMealHandler, subMealHandler, filterHandler, cleanCartHandler } =
      this;
    return (
      <div className="container">
        <FilterMeals filterHandler={filterHandler}></FilterMeals>
        <Context.Provider
          value={{ addMealHandler, subMealHandler, cleanCartHandler }}
        >
          <Meals mealsData={filterMealsData}></Meals>
          <Cart cartData={cartData}></Cart>
        </Context.Provider>
      </div>
    );
  }
  //添加商品,获取商品和最新的数量
  addMealHandler = (meal: MealData, amount: number): void => {
    //更新商品的数量属性
    meal = { ...meal, amount };
    const { cartData } = this.state;
    //复制当前购物车
    const newCart: CartData = { ...cartData };
    //创建变量判断商品是否存在
    let isExist: boolean = false,
      i = 0;
    do {
      //判断商品是否一件都没有,直接退出循环
      if (!cartData.items.length) break;
      //如果当前添加的商品在购物车中有就设置为存在,并退出循环
      if (meal.id === cartData.items[i].id) {
        isExist = true;
        break;
      }
      //自增
      i++;
      //判断索引是否小于商品列表长度
    } while (i < cartData.items.length);
    //如果存在,就直接替换,否则就添加
    if (isExist) {
      newCart.items[i] = meal;
    } else {
      newCart.items.push(meal);
    }
    //总数增加
    newCart.totalAmount += 1;
    //总价增加
    newCart.totalPrice += meal.price;
    //更新数据
    this.setState((state) => ({ ...state, cartData: newCart }));
    this.filterHandler("");
  };
  //删除商品,获取商品和数量
  subMealHandler = (meal: MealData, amount: number): void => {
    meal = { ...meal, amount };
    const { cartData } = this.state;
    //复制当前购物车
    const newCart: CartData = { ...cartData };
    let i = 0;
    do {
      if (!cartData.items.length) return;
      if (meal.id === cartData.items[i].id) {
        if (newCart.items[i].amount! > 1) {
          newCart.items[i] = meal;
        } else {
          newCart.items.splice(i, 1);
        }
        break;
      }
      i++;
    } while (i < cartData.items.length);
    newCart.totalAmount -= 1;
    newCart.totalPrice -= meal.price;
    this.setState((state) => ({ ...state, cartData: newCart }));
    this.filterHandler("");
  };
  filterHandler = (value: string): void => {
    let { mealsData, cartData } = this.state;
    if (cartData.items.length) {
      mealsData = mealsData.map((meal, i) => {
        if (cartData.items[i] && meal.id === cartData.items[i].id) {
          return cartData.items[i];
        } else {
          return meal;
        }
      });
    }
    if (!value) {
      this.setState((state) => ({ ...state, filterMealsData: mealsData }));
    } else {
      this.setState((state) => ({
        ...state,
        filterMealsData: mealsData.filter((meal) => meal.title.includes(value)),
      }));
    }
  };
  cleanCartHandler = (): void => {
    this.setState((state) => ({
      ...state,
      cartData: { items: [], totalAmount: 0, totalPrice: 0 },
    }));
  };
}

export default App;
