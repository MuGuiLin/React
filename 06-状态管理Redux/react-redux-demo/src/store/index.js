import { createStore, combineReducers } from 'redux';

/*
    redux的由来：
        由于各个组件的位置、层次、路径的不同，在通信问题上，如果只用this.state 和 this.props(单向数据流)来传递，层次越深就越繁琐。
        组件更新除了第一个页面加载后，有两种方式：props或state的改变，而改变state一般是通过setState()方法来的，只有当state或props改变，render()方法才能再次调用，即组件更新

    数据共享方式：
        1、本地存储（localStorage，sessionStorage）
        2、内存（redux，react-redux）

    redux方法说明：
        createStore() 创建store
        combineReducers() 初始化、修改状态
        
        getState() 获取状态值
        dispatch() 提交更新状态
        subscribe() 变更订阅

    react-redux：
        redux和react并没直接关系，redux是一个独立的js状态管理库，但如果要在react中使用redux还需要另外再安装react-redux
        npm i -S redux react-redux

    redux在修改更新状态(数据)时，整体全部修改，所以在修改数据时根据你传入的action.type 和 action.data  用对象解构合并的方式{...obj1, ...obj2} 来修改store中的数据。
	当key相等就覆盖数据，其他不相等的就保持不变！

*/

// const initDate = {
//     users: {
//         name: '沐枫',
//         age: 28,
//         job: 'Web 全栈'
//     },
//     books: {
//         name: 'HTML5权威指南',
//         page: 680,
//         rmb: 98,
//         date: '2016-05-20'
//     }
// };
// export default createStore(function (state, action) {

//     console.debug('*********state中是上一次的状态(数据)', state);
//     console.debug('*********action中是将修改的对象，和要修改的新值', action);

//     switch (action.type) {
//         case "USERS":
//             // 修改数据：key相等就覆盖数据，其他保持不变！
//             return { ...state, ...action.data }
//             break;

//         case "BOOKS":
//             // 修改数据：key相等就覆盖数据，其他保持不变！
//             return { ...state, ...action.data }
//             break;
//         default:
//             return state;
//             break;
//     };

// }, initDate); // initDate是第一次向仓库中提交的初始值



//当状态数据太多时，可将其分片管理（拆分为多个模块，然后在集中管理），用combineReducers方法来构建状态管理仓库！

import users from './reducer/users';
import items from './reducer/items';
import goods from './reducer/goods';

export default createStore(combineReducers({
    users,
    goods,
    items
}));
