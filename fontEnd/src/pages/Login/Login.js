import React from 'react';
import { connect } from 'react-redux';

import userAction from '../../store/user/userAction';

import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    // 登录接口
    loginIn = () => {
        let username = this.state.username.trim(),
            password = this.state.password.trim();

        this.props.loginIn(username, password);
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
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="username" value={ this.state.username } onChange={ this.modifyUser } />
                    <label className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="password" value={ this.state.password } onChange={ this.modifyPass } />
                    <div className="checkbox">
                        {/* <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label> */}
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={ this.loginIn }>登录</button>
                </form>
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