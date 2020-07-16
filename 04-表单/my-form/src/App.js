import React from 'react';
import './App.css';

import Home from "./views/Home";
import EventBind from "./components/EventBind";
import MyForm from "./views/MyForm";
import Comp from "./views/Comp";

function App() {
  return (
    <div className="App">
      <Home></Home>
      <h1>事件绑定：</h1>
      <EventBind data={{name:'沐枫', age: 28}} />
      <h1>表单控件：</h1>
      <MyForm></MyForm>
      <h1>组件通信</h1>
      <Comp/>
    </div>
  );
}

export default App;
