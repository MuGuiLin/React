// 使用redux来管理数据
// 注：安装时在把redux 和 react-redux 要一起安装哦 npm i -S redux react-redux
import { createStore, combineReducers } from 'redux';


import user from './reducer/users';
import book from './reducer/books';



const store = createStore(
    combineReducers({
        user: user,
        book
    })
);

// 向处暴露store存储仓库
export default store;