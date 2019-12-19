import React from 'react';
import { Route } from 'react-router-dom'

import Menu from '../components/Menu';

import Home from '../views/Home';
import About from '../views/About';
import Self from '../views/Self';

import '../static/css/App.css';

const myData = {
  name: '沐枫',
  age: 28,
  sex: '男',
  job: {
    h5: 'HTML5',
    js: {
      dom: 'Node.Js'
    },
    es: 'Web 前端开发'
  }
}

function App() {
  return (
    <div className="App">
      <Menu></Menu>
      {/* 第1种、页面渲染方式 - 纯展示 没有路由 */}
      {/* <Home></Home> */}

      {/* 第2种、页面路由渲染方式 - 有路由，但不能传参 */}
      {/* <Route path="/" component={Home}></Route> */}

      {/* 第3种、页面路由渲染方式 - 有路由，可以传参 【注：path="/" 时，对应的页面会一直显示，所以要加 exact 表示唯一】 */}
      <Route path="/" exact render={() => {
        return <Home sendData={myData}></Home>
      }}></Route>

      {/* 第4种、页面路由渲染方式 - 有路由，可以传参，并可以在路由中传参(动态路由传参) */}
      <Route path="/about/" render={() => {
        return <About data={myData}></About>
      }}></Route>

      <Route path="/self" render={() => {
        return <Self></Self>
      }}></Route>

    </div>
  );
}

export default App;
