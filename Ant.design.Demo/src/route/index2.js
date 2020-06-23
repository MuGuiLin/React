import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import Main from '../views/Main';

import Inspection from '../views/Inspection';
import Templet from '../views/Inspection/Templet';
import NewEditTemplet from '../views/Inspection/newEditTemplet';
import EditInspection from '../views/Inspection/editInspection';

import MyInspection from '../views/Inspection/MyInspection';
import NotInspection from '../views/Inspection/NotInspection';
import AllInspection from '../views/Inspection/AllInspection';

import Abnormal from '../views/Abnormal';
import AbnormalTemplate from '../views/Abnormal/Template';

import Exercise from '../views/Exercise';
import ExerciseTemplate from '../views/Exercise/Template';

import Overview from '../views/Overview';
import OverviewTemplate from '../views/Overview/Template';

import CheckList from '../views/CheckList';
import CheckListTemplate from '../views/CheckList/Template';

import Authority from '../views/Authority';
import AuthorityTemplet from '../views/Authority/Templet';


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
                                    <Route path='/main/inspection/NewEditTemplet' component={NewEditTemplet} />
                                    <Route path='/main/inspection/EditInspection' component={EditInspection} />
                                    <Route path='/main/inspection/MyInspection' component={MyInspection} />
                                    <Route path='/main/inspection/NotInspection' component={NotInspection} />
                                    <Route path='/main/inspection/AllInspection' component={AllInspection} />
                                </Switch>
                            </Inspection>
                        } />
                        <Route path="/main/abnormal" render={() => 
                            <Abnormal>
                                <Switch>
                                    <Route path='/main/abnormal' component={AbnormalTemplate} />
                                </Switch>
                            </Abnormal>
                        } />
                        <Route path="/main/exercise" render={() => 
                            <Exercise>
                                <Switch>
                                    <Route path='/main/exercise' component={ExerciseTemplate} />
                                </Switch>
                            </Exercise>
                        } />
                        <Route path="/main/overview" render={() => 
                            <Overview>
                                <Switch>
                                    <Route path='/main/overview' component={OverviewTemplate} />
                                </Switch>
                            </Overview>
                        } />
                        <Route path="/main/checklist" render={() => 
                            <CheckList>
                                <Switch>
                                    <Route path='/main/checklist' component={CheckListTemplate} />
                                </Switch>
                            </CheckList>
                        } />
                        <Route path="/main/authority" render={() =>
                            <Authority>
                                <Switch>
                                    <Route path='/main/authority' component={AuthorityTemplet} />
                                </Switch>
                            </Authority>
                        } />
                    </Main>
                } />

                <Route path="*" render={(h, l, m) => {
                    return <h1>404</h1>
                }}></Route>

            </Switch>
        </HashRouter>
    );
};
