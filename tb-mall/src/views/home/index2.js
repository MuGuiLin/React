import React, { useState, useEffect } from "react";
import "./index.scss";

// function函数式 组件
export default function () {

    //状态存储 (这里是用React提供的hook 钩子来做状态存储的)
    const [date, upDate] = useState(new Date());

    // 组件加载完成后执行 useEffect 副作用
    useEffect(() => {
        // console.log(重复执行啦！);
        const timer = setInterval(() => {
            //状态更新
            upDate(new Date())
        }, 1000);


        // 组件卸载之前执行
        return () => {
            return clearInterval(timer);
        }

    }, []);  // [] 表示依赖项（就是当谁的值改变后会重复执行useEffect中的回调函数，[]表不任何值改变都不执行）

    return (
        <h1>{date.toLocaleDateString()} {date.toLocaleTimeString()}</h1>
    );
};