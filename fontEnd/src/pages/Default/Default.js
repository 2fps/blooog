import React from 'react';
import { Menu } from 'element-react';
import { Link } from "react-router-dom";
import {
    Switch,
    Route
} from 'react-router-dom';

import Welcome from '../../components/welcome/welcome';

import './Default.css';

export default class Default extends React.Component{
    onOpen() {

    }
    
    onClose() {
    
    }
    render() {
        return (
            <div>
                <div className="default-navbar">
                    <div>
                        blooog,欢迎使用
                    </div>
                    <div>
                        登出
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
                            <Menu.Item index="2-2">写文章</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item index="3"><i className="el-icon-menu"></i>设置</Menu.Item>
                    </Menu>
                    <div className="default-content">
                        <Switch>
                            <Route path="/default/welcome" component={ Welcome }/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}