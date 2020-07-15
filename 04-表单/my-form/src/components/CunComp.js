import React from "react";

export default function FnComp(par) {
    console.log(par)
    return (
        <div>
            <h2>我是函数式组件!</h2>
            <p>{par.num }</p>
        </div>
    )
};