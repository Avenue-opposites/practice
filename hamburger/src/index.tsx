//引入React,ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//创建根元素
const root:ReactDOM.Root = ReactDOM.createRoot(
    //类型断言
    document.getElementById("root") as HTMLElement
);

 //移动端适配
const fontSize = `${100/750}VW`;
// console.log(fontSize);

document.documentElement.style.fontSize = fontSize;

//渲染页面
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
