import React from 'react';
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";

import './App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './views/Home/Home';
import About from './views/About/About';
import Jsx from './views/Jsx/Jsx';
import Redux from './views/Redux/Redux';

import Dish from './views/Dish/Dish';
import List from './views/Dish/List';
import Info from './views/Dish/Info';

import NotFound from './views/NotFound/NotFound';

function App() {
    return (
        <div className="App">

            <Header />

            <section className="main">
                <Switch>
                    {/* exact 精确路由匹配
                        <Route path="/" exact component={Home} ></Route> 
                    */}
                    <Route path="/" exact render={() => {
                        return <Home data={{ name: 666 }} />
                    }}></Route>

                    <Route path="/about" component={About} ></Route>
                    <Route path="/jsx" component={Jsx} ></Route>
                    <Route path="/redux" component={Redux} ></Route>


                    {/* <Route path="/dish" component={Dish}></Route> */}
                    <Route path="/dish" render={(props) =>
                        <Dish {...props} >
                            {/* 路由嵌套 */}
                            <Route path="/dish" exact component={List}></Route>
                            <Route path="/dish/info/:id" render={(props) => <Info {...props} />}></Route>
                        </Dish>
                    }></Route>

                    <Route path="*" render={(h, l, m) => {
                        return <NotFound />

                        // 还可还以使用重定向组件
                        return <Redirect to="/" />
                    }}></Route>

                </Switch>
            </section>

            <Footer />
        </div>
    );
}


export default App;
