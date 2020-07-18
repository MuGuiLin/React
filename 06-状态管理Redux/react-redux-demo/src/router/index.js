import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/Home/Home';
import Redux from '../views/Redux/Redux';
import ReactRedux from '../views/ReactRedux/ReactRedux';

class index extends Component {
    render() {
        {/* 配置路由Hash管理容器 */ }
        return (
            <section style={{ margin: 'auto', width: '1280px', minHeight: '88vh' }}>
                {/* Switch 只匹配1次就不再向下继续匹配啦 */}
                <Switch>
                    {/* exact精确匹配路由 */}
                    <Route path="/" component={Home} exact></Route>

                    <Route path="/redux" render={(props) => {
                        // 这是路由匹配的另一种写法
                        return <Redux {...props} />
                    }}></Route>

                    <Route path="/react-redux" component={ReactRedux}></Route>

                    {/* 当所有的路由都没有被匹配到时 */}
                    <Route path="*" render={(props) => {
                        return (<h1> 404页面！</h1>);

                        // 重定向
                        return <Redirect to="/"></Redirect>
                    }} />

                </Switch>
            </section>
        );
    }
};

export default index;