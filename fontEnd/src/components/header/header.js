import React from 'react';
import { Link } from "react-router-dom";
import { createHashHistory } from 'history';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import './header.scss';

const history = createHashHistory();

let scrollFn = function() {};
const styles = theme => ({
    root: {
        width: '100%',
        position: 'absolute',
        top: '0px'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
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
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    
    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <a className="color-fff" href={ this.props.website.modifyConfig.siteUrl }>{ this.props.website.modifyConfig.siteName }</a>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.goToLogin}
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

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);