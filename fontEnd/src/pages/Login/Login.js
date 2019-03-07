import React from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import userAction from '../../store/user/userAction';
import * as Http from '../../api/http';
import { JSEncrypt } from 'jsencrypt';
import Toastr from 'toastr';

import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import './Login.scss';

const history = createHashHistory();

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
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
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }
    inputKeyPress = (e) => {
        if (13 === e.keyCode) {
            // 回车键
            this.loginIn();
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        欢迎使用Zircon！
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">用户名</InputLabel>
                            <Input id="username" name="username"  value={ this.state.username } onChange={ this.modifyUser } autoComplete="false" autoFocus onKeyPress={ this.inputKeyPress} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">密码</InputLabel>
                            <Input name="password" type="password" id="password" value={ this.state.password } onChange={ this.modifyPass } autoComplete="current-password" onKeyPress={ this.inputKeyPress} />
                        </FormControl>
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                            onClick={ this.loginIn }
                        >
                            登录
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withStyles(styles)(Login)));