# React介绍

**[React 中文文档](https://zh-hans.reactjs.org/)**

**一个用于构建用户界面的 <u>JavaScript</u> 库**



## 起源

`React` 起源于 `Facebook` 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，做出来以后，发现这套东西很好用，就在2013年5月开源了，随后越来越多人开始关注和使用 `React`，慢慢的 `React` 就成为了当前最流行的前端开发框架之一



## 特点

- `React` 采用了声明式编程范式，可以更加方便的构建 `UI` 应用
- 内部封装更加高效的与底层`DOM`进行交互的逻辑，提高性能的同时也能帮助我们更加专注于业务
- 可以很好的接纳其它框架或库与其进行配合。

- React负责逻辑控制，数据 -> VDOM(虚拟DOM)
- ReactDom渲染实际DOM，VDOM -> DOM
- React使用JSX来描述UI
- babel-loader把JSX 编译成相应的 JS 对象，React.createElement再把这个JS对象构造成React需要的虚拟dom。



## JSX语法

JSX是⼀种JavaScript的语法扩展，其格式比较像模版语言，但事实上完全是在JavaScript内部实现的。
JSX可以很好地描述UI，能够有效提高开发效率，
px



## React 全家桶

- `React` : 提供框架（库）核心功能，如 `组件`、`虚拟DOM` 等

- `React-DOM` : 可在应用顶层使用的 DOM（DOM-specific）方法

- `react-router` : 基于 `React` 的路由库

- `redux、react-redux` : 状态管理库

    