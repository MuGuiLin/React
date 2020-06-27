import React, { useState } from 'react';

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./views/home/index1";
import List from "./views/list";
import Cart from "./views/cart";
import Self from "./views/self";
import './App.scss';

function App() {
    const [active, setActiveFn] = useState(0);
    console.log(active, setActiveFn)
    return (
        <section className="App">
            <Header active={active} />
            <section className="main">
                {0 == active && <Home />}
                {1 == active && <List />}
                {2 == active && <Cart />}
                {3 == active && <Self />}
            </section>
            <Footer active={active} setActive={setActiveFn} />
        </section>
    );
}

export default App;
