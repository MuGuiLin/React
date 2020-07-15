import React from 'react';
import './App.css';

import Home from "./views/Home";
import EventBind from "./components/EventBind";
import MyForm from "./views/MyForm";

function App() {
  return (
    <div className="App">
      {/* <Home></Home> */}
      <EventBind data={{name:'沐枫', age: 28}} />
      <MyForm></MyForm>
    </div>
  );
}

export default App;
