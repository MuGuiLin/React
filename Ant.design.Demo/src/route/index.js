import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import Main from '../views/Main';

import Inspection from '../views/Inspection';
import Templet from '../views/Inspection/Templet';
import MyInspection from '../views/Inspection/MyInspection';
import NotInspection from '../views/Inspection/NotInspection';
import AllInspection from '../views/Inspection/AllInspection';

import Abnormal from '../views/Abnormal';
import Exercise from '../views/Exercise';
import Overview from '../views/Overview';
import CheckList from '../views/CheckList';
import Authority from '../views/Authority';


export default router => {
    console.log('route');

    return (
        <HashRouter>
            <Switch>

                <Route path="/" exact render={(history, location, match) => {
                    return <Home></Home>
                }}></Route>

                <Route path="/main" render={(h, l, m) =>
                    <Main history={h} location={l} match={m}>
                        <Route path="/main/inspection" render={() =>
                            <Inspection>
                                <Switch>
                                    <Route path='/main/inspection' exact component={Templet} />
                                    <Route path='/main/inspection/myinspection' component={MyInspection} />
                                    <Route path='/main/inspection/notInspection' component={NotInspection} />
                                    <Route path='/main/inspection/allInspection' component={AllInspection} />
                                </Switch>
                            </Inspection>
                        } />
                        <Route path="/main/abnormal" component={Abnormal} />
                        <Route path="/main/exercise" component={Exercise} />
                        <Route path="/main/overview" component={Overview} />
                        <Route path="/main/checklist" component={CheckList} />
                        <Route path="/main/authority" component={Authority} />
                    </Main>
                } />

                <Route path="*" render={(h, l, m) => {
                    return <h1>404</h1>
                }}></Route>
                
            </Switch>
        </HashRouter>
    );
};
