import React from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import { Form, Input, Button } from 'semantic-ui-react';

import userAction from '../../store/user/userAction';
import * as Http from '../../api/http';

import './Login.css';

const history = createHashHistory();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLogining: false,
            formError: false
        };
    }
    // 登录接口
    loginIn = () => {
        let username = this.state.username.trim(),
            password = this.state.password.trim();

        this.setState({
            isLogining: true,
            formError: false
        });

        Http.loginIn(username, password).then((data) => {
            let da = data.data;

            if (da.result) {
                // 成功
                sessionStorage.setItem('token', da.token);
                history.push('/default/welcome');
            }
        }).catch(() => {

        })
        .then(() => {
            this.setState({
                isLogining: false,
                formError: true
            });
        });
    }
    modifyUser = (e) => {
        let username = e.target.value;

        this.setState({
            username
        });
    }
    modifyPass = (e) => {
        let password = e.target.value;

        this.setState({
            password
        });
    }
    render() {
        return (
            <div className="login-container">
                <Form loading={ this.state.isLogining }>
                    <Form.Field required error={ this.state.formError }>
                        <label>用户名：</label>
                        <Input placeholder="用户名" value={ this.state.username } onChange={ this.modifyUser } />
                    </Form.Field>
                    <Form.Field required error={ this.state.formError }>
                        <label>密码：</label>
                        <Input placeholder="密码" value={ this.state.password } onChange={ this.modifyPass } />
                    </Form.Field>
                    <Button content="登录" secondary onClick={ this.loginIn } />
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 登录
        loginIn: (...args) => dispatch(userAction.loginIn(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Login);