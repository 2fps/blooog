import React from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
// import { Form, Input, Button, Message} from 'semantic-ui-react';

import userAction from '../../store/user/userAction';
import * as Http from '../../api/http';
import { JSEncrypt } from 'jsencrypt';
import Toastr from 'toastr';

import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './Login.scss';

const history = createHashHistory();

const styles = createStyles({
    login: {
        padding: '16px 24px 24px',
        backgroundColor: 'blue'
    },
    spacing: {
        marginTop: '20px'
    },

});


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLogining: false,
            formError: false,
            showPassword: false
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

        // 获取公钥
        Http.getPublicKey().then((da) => {
            let publicKey = da.data.secret,
                encrypt = new JSEncrypt();

            encrypt.setPublicKey(publicKey);
            // 加密密码
            password = encrypt.encrypt(password);

            Http.loginIn(username, password).then((data) => {
                let da = data.data;
            
                if (da.result) {
                    // 成功
                    sessionStorage.setItem('token', da.token);
                    sessionStorage.setItem('username', username);
            
                    history.push('/default/welcome');
                } else {
                    Toastr.error('用户名或密码错误!', '错误');
                }
            }).catch(() => {
            
            })
            .then(() => {
                this.setState({
                    isLogining: false,
                    formError: true
                });
            });
        });
    }
    modifyUser = (e) => {
        let username = e.target.value;

        this.setState({
            username,
            formError: false
        });
    }
    modifyPass = (e) => {
        let password = e.target.value;

        this.setState({
            password,
            formError: false
        });
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render() {
        return (
            <div className="login-container">
                <Paper className="login-form">
                    <FormControl fullWidth>
                        <InputLabel htmlFor="component-simple">用户名</InputLabel>
                        <Input id="component-simple" value={ this.state.username } onChange={ this.modifyUser } />
                    </FormControl>
                    <FormControl fullWidth className="button-spacing-input">
                        <InputLabel htmlFor="adornment-password" autocomplete="false">密码</InputLabel>
                        <Input
                            id="adornment-password"
                            type={ this.state.showPassword ? 'text' : 'password' }
                            value={ this.state.password }
                            onChange={ this.modifyPass }
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={ this.handleClickShowPassword }
                                >
                                { this.state.showPassword ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth className="button-spacing-btn">
                        <Button variant="contained" color="primary" onClick={ this.loginIn }>
                            登录
                        </Button>
                    </FormControl>
                </Paper>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));