import React from 'react';
import { connect } from 'react-redux';
import { Icon, Dropdown, Button, Confirm, Modal, Accordion, Form, Item } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Toastr from 'toastr';
import { createHashHistory } from 'history';
import {
    Switch,
    Route
} from 'react-router-dom';

import * as Http from '../../api/http';

import Welcome from '../../components/welcome/welcome';
import Showallarticle from '../../components/showallarticle/showallarticle';
import Writearticle from '../../components/writearticle/writearticle';
import Setting from '../../components/setting/setting';

import './Default.scss';
const history = createHashHistory();

class Default extends React.Component{
    constructor() {
        super();
        this.state = {
            showModiyPass: false,       // 是否显示修改密码的输入框
            showLoginout: false,        // 是否显示退出的提示
            open: false,
            form: {
                oldPass: '',
                newPass1: '',
                newPass2: '',
                oldPassError: false,
                newPassError: false
            },
            activeIndex: 0
        }
    }
    onOpen() {

    }
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }
    // 退出弹出框点击确定，触发退出事件
    loginOut = () => {
        // 清除token
        sessionStorage.setItem('token', '');
        history.push('/login');
    }
    showModifyPass = () => {
        this.setState({
            open: true
        });
    }
    modifyInfo = (e) => {
        let name = e.target.parentElement.getAttribute('data-name'),
            form = this.state.form;

        form[name] = e.target.value;
        form.newPassError = false;
        form.oldPassError = false;

        this.setState({
            form
        });
    }
    confirmModifyPass = () => {
        let form = this.state.form;

        if ('' === form.oldPass.trim()) {
            form.newPassError = true;
            this.setState({form});

            return;
        }
        // 校验
        if (form.newPass1 !== form.newPass2 || 
            '' == form.newPass1 || '' == form.newPass2) {
            form.oldPassError = true;
            this.setState({form});

            return;
        }
        let username = sessionStorage.getItem('username');
        // send
        Http.modifyPass(username, form.oldPass, form.newPass1).then((data) => {
            if (data.data.result) {
                // 修改成功
                sessionStorage.setItem('token', '');
                sessionStorage.setItem('username', '');

                history.push('/login');
                Toastr.success('修改成功，请重新登录!', '提示');
            }
        });

        this.handleClose();

    }
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })
    handleOpen = () => this.setState({ showModiyPass: true })
    showLoginout = () => this.setState({ showLoginout: true })

    handleClose = () => this.setState({
        showModiyPass: false,
        showLoginout: false
    })
    render() {
        const { activeIndex } = this.state
        return (
            <div>
                <div className="default-navbar">
                    <div className="login-out">
                        <Dropdown text='用户名'>
                            <Dropdown.Menu>
                                <Modal
                                    trigger={ <Dropdown.Item onClick={this.handleOpen} text='修改密码'/>}
                                    open={ this.state.showModiyPass }
                                    onClose={ this.handleClose }
                                    >
                                    <Modal.Header>密码修改</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <Form>
                                                <Form.Field >
                                                    <Form.Input fluid label='旧密码：' type="password" value={ this.state.form.oldPass } data-name="oldPass" onChange={ this.modifyInfo } placeholder='旧密码' error={ this.state.form.newPassError } />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Form.Input fluid label='新密码：' type="password" value={ this.state.form.newPass1 } data-name="newPass1" onChange={ this.modifyInfo } placeholder='新密码' error={ this.state.form.oldPassError } />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Form.Input fluid label='再一次输入新密码：' type="password" value={ this.state.form.newPass2 } data-name="newPass2" onChange={ this.modifyInfo } placeholder='新密码' error={ this.state.form.oldPassError } />
                                                </Form.Field>
                                                <Form.Field className="text-center">
                                                    <Button secondary onClick={ this.handleClose }>取消</Button>
                                                    <Button color='red' onClick={ this.confirmModifyPass }>确定</Button>
                                                </Form.Field>
                                            </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                                <Modal
                                    trigger={ <Dropdown.Item text='登出' onClick={ this.showLoginout } />}
                                    open={ this.state.showLoginout }
                                    onClose={ this.handleClose }
                                    size="tiny">
                                    <Modal.Header>登出</Modal.Header>
                                    <Modal.Content>
                                        <p>确定登出吗？</p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative onClick={ this.handleClose }>取消</Button>
                                        <Button positive onClick={ this.loginOut }>确定</Button>
                                    </Modal.Actions>
                                </Modal>
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
                    <Accordion className="default-menu">
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick} as="a" href="#default/welcome">
                            <Icon name="list layout" />
                            {/* <Icon name='dropdown' /> */}
                            <span>首页</span>
                        </Accordion.Title>

                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                            <Icon name="signup" />
                            文章
                            <Icon name='dropdown' />
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <Item.Group>
                                <Item>
                                    <Item.Content verticalAlign='middle' as="a" href="#default/showallarticle">
                                        <span>所有文章</span>
                                    </Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content verticalAlign='middle' as="a" href="#default/writearticle">
                                        <span>写文章</span>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Accordion.Content>
                        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}  as="a" href="#default/setting">
                            <Icon name="settings" />
                            <span>设置</span>
                            {/* <Icon name='dropdown' /> */}
                        </Accordion.Title>
                    </Accordion>
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
                    content='<span a="a">123</span>'
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