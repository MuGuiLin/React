import { createStore, combineReducers } from 'redux';

import users from './reducer/users';
import items from './reducer/items';
import goods from './reducer/goods';
/*
    redux的由来：
        由于各个组件的位置、层次、路径的不同，在通信问题上，如果只用this.state 和 this.props(单向数据流)来传递，层次越深就越繁琐。
        组件更新除了第一个页面加载后，有两种方式：props或state的改变，而改变state一般是通过setState()方法来的，只有当state或props改变，render()方法才能再次调用，即组件更新

    数据共享：
        1、本地存储（localStorage，sessionStorage）
        2、内存（redux，react-redux）

    react-redux：
        redux和react并没直接关系，redux是一个独立的js状态管理库，但如果要在react中使用redux还需要另外再安装react-redux
        npm i -S redux react-redux

    方法说明：
    createStore() 创建store
    combineReducers() 初始化、修改状态
    
    getState() 获取状态值
    dispatch() 提交更新状态
    subscribe() 变更订阅
*/


// 构建状态管理仓库 来管理数据！
// const reducer = combineReducers({
//     users,
//     goods
// });

// const stort = createStore(reducer);

// export default stort;



//以上还可以这样简写
export default createStore(combineReducers({
    users,
    goods
}));
