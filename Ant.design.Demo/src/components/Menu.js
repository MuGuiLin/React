import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

export default class Menus extends React.Component {
    render() {
        return (
            <Sider breakpoint="xl" collapsedWidth="0" width="220" style={{ 'fontSize': '24px' }} onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}  >

                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <NavLink to="/main/inspection" exact={true} activeClassName={'show'}>
                            <Icon type="user" />
                            <span className="nav-text">巡检管理</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="2">

                        <NavLink to="/main/abnormal" activeClassName={'show'}>
                            <Icon type="thunderbolt" />
                            <span className="nav-text">异态管理</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <NavLink to="/main/exercise" activeClassName={'show'}>
                            <Icon type="video-camera" />
                            <span className="nav-text">应急演练</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <NavLink to="/main/overview" activeClassName={'show'}>
                            <Icon type="file-protect" />
                            <span className="nav-text">综述管理</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <NavLink to="/main/checklist" activeClassName={'show'}>
                            <Icon type="setting" />
                            <span className="nav-text">系统清单</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="6">
                        <NavLink to="/main/authority" activeClassName={'show'}>
                            <Icon type="apartment" />
                            <span className="nav-text">权限管理</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>

            </Sider>
        )
    }
};

