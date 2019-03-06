import React from 'react';
import { Link } from "react-router-dom";
import { createHashHistory } from 'history';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';



import './header.scss';

const history = createHashHistory();

let scrollFn = function() {};

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        };
    }
    componentDidMount() {
        let me = this;
        // 绑定监听滚动条，处理navbar
/*         window.addEventListener('scroll', scrollFn = () => {
            let rate = Math.min(window.scrollY / 100, 1),
                padding = (1 - rate) * 15;

            me.refs.header.style.paddingTop = padding + 'px';
            me.refs.header.style.paddingBottom = padding + 'px';
        }); */
    }
    componentWillUnmount() {
        // 滚动事件解绑定
        window.removeEventListener('scroll', scrollFn);
        scrollFn = function() {};
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    goToLogin = () => {
        const token = sessionStorage.getItem('token');
        // 判断下用户是否已经登录了
        if (token) {
            history.push('/default/welcome');
        } else {
            history.push('/login');
        }
    }
    render() {
        return (
            <div className="navbar-title">
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" color="inherit" noWrap>
                            <a className="color-fff" href={ this.props.website.modifyConfig.siteUrl }>{ this.props.website.modifyConfig.siteName }</a>
                        </Typography>
                        <div className="navbar-right">
                            {/* <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <IconButton
                                aria-haspopup="true"
                                onClick={ this.goToLogin }
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}