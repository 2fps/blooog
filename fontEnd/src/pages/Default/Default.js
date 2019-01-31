import React from 'react';
import { Menu , MessageBox} from 'element-react';
import { connect } from 'react-redux';
import { Icon, Dropdown, Button, Confirm } from 'semantic-ui-react'
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

class Default extends React.Component{
    constructor() {
        super();
        this.state = { open: false }
    }
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
    showModifyPass = () => this.setState({ open: true })
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })
    modifyPass = () => {

    }
    render() {
        return (
            <div>
                <div className="default-navbar">
                    <div className="login-out">
                        <Dropdown text='用户名'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='登出' onClick={ this.loginOut } />
                                <Dropdown.Item text='修改密码' onClick={ this.showModifyPass } />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <a href={ this.props.website.siteUrl }>
                            <Icon disabled name="reply" />
                            返回主页
                        </a>
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
                <Confirm
                    open={this.state.open}
                    header='This is a custom header'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tags,
        newestArticles: state.filter.newestArticles,
        website: state.website,                         // 站点配置信息
        pageSize: state.filter.pageSize,
        nowPage: state.filter.nowPage
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Default);