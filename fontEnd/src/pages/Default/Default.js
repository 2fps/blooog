import React from 'react';
import { Menu , MessageBox} from 'element-react';
// import { Input, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { createHashHistory } from 'history';
import {
    Switch,
    Route
} from 'react-router-dom';

import Welcome from '../../components/welcome/welcome';
import Showallarticle from '../../components/showallarticle/showallarticle';
import Writearticle from '../../components/writearticle/writearticle';
import Setting from '../../components/setting/setting';

import './Default.css';
const history = createHashHistory();

export default class Default extends React.Component{
    onOpen() {

    }
    
    onClose() {
    
    }
    loginOut = () => {
        MessageBox.confirm('确定登出, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            localStorage.setItem('token', '');
            history.push('/login');
        });
    }
    render() {
        return (
            <div>
                <div className="default-navbar">
                    <div className="login-out">
                        <span onClick={ this.loginOut }>登出</span>
                    </div>
                    <div>
                        <span>blooog,欢迎使用</span>
                    </div>
                </div>
                
                <div>
                    <Menu defaultActive="2" className="el-menu-vertical-demo default-menu" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                        <Menu.Item index="1">
                            <i className="el-icon-menu"></i>
                            <a href="#default/welcome">首页</a>
                        </Menu.Item>
                        <Menu.SubMenu index="2" title={<span><i className="el-icon-message"></i>文章</span>}>
                            <Menu.Item index="2-1">
                                <a href="#default/showallarticle">所有文章</a>
                            </Menu.Item>
                            <Menu.Item index="2-2">
                                <a href="#default/writearticle">写文章</a>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item index="3">
                            <i className="el-icon-menu"></i>
                            <a href="#default/setting">设置</a>
                        </Menu.Item>
                    </Menu>
                    <div className="default-content">
                        <Switch>
                            <Route path="/default/welcome" component={ Welcome }/>
                            <Route path="/default/showallarticle" component={ Showallarticle }/>
                            <Route path="/default/writearticle" component={ Writearticle }/>
                            <Route path="/default/setting" component={ Setting }/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}