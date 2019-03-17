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
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
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
    pointer: {
        cursor: 'pointer'
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
            showPassword: false,
            verificationCode: '',       // 验证码内容
            verificationCodeValue: '',  // 用户输入的验证码内容
        };
    }
    // 登录接口
    loginIn = () => {
        let username = this.state.username.trim(),
            password = this.state.password.trim(),
            verificationCodeValue = this.state.verificationCodeValue.trim();

        this.setState({
            isLogining: true,
            formError: false
        });

        // 获取公钥
        Http.getPublicKey().then((da) => {
            if (da.data.result) {
                // 开启加密则加密 password 字段
                let publicKey = da.data.secret,
                    encrypt = new JSEncrypt();
    
                encrypt.setPublicKey(publicKey);
                // 加密密码
                password = encrypt.encrypt(password);
            }
            // 用户登录
            Http.loginIn(username, password, verificationCodeValue).then((data) => {
                let da = data.data;
            
                if (da.result) {
                    // 成功
                    sessionStorage.setItem('token', da.token);
                    sessionStorage.setItem('username', username);
            
                    history.push('/default/welcome');
                } else {
                    Toastr.error(da.msg);
                    // 重新刷新并获取验证码
                    this.refreshVerificationCode();
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
        if (13 === e.charCode) {
            // 回车键
            this.loginIn();
        }
    }
    inputVerificationCode = (e) => {
        this.setState({
            verificationCodeValue: e.target.value
        });
    }
    refreshVerificationCode = () => {
        Http.getVerificationCode().then((data) => {
            let da = data.data;

            if (da.result) {
                // 有验证码，需要去显示他
                this.setState({
                    verificationCode: da.data
                });
            }
        });
    }
    renderVerificationCode = (classes) => {
        if (this.state.verificationCode) {
            return (
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">验证码</InputLabel>
                    <Input name="password"
                        id="password"
                        value={ this.state.verificationCodeValue }
                        onChange={ this.inputVerificationCode }
                        autoComplete="current-password"
                        onKeyPress={ this.inputKeyPress }
                        endAdornment={
                            <InputAdornment position="end" className={ classes.pointer } onClick={ this.refreshVerificationCode }>
                                <span dangerouslySetInnerHTML={{ __html: this.state.verificationCode }} />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            );
        } else {
            return (
                <span></span>
            );
        }
    }
    componentWillMount() {
        this.refreshVerificationCode();
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
                            <Input name="password"
                                type={ this.state.showPassword ? 'text' : 'password' }
                                id="password" value={ this.state.password } onChange={ this.modifyPass }
                                autoComplete="current-password"
                                onKeyPress={ this.inputKeyPress }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={ this.handleClickShowPassword }
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        { this.renderVerificationCode(classes) }
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