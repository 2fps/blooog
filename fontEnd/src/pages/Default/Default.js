import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Toastr from 'toastr';
import { createHashHistory } from 'history';
import {
    Switch,
    Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// icon 图标
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BorderColor from '@material-ui/icons/BorderColor';
import Home from '@material-ui/icons/Home';
import Loyalty from '@material-ui/icons/Loyalty';
import Settings from '@material-ui/icons/Settings';
import Description from '@material-ui/icons/Description';
import DeveloperBoard from '@material-ui/icons/DeveloperBoard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import * as Http from '../../api/http';

import Welcome from '../../components/welcome/welcome';
import Showallarticle from '../../components/showallarticle/showallarticle';
import Writearticle from '../../components/writearticle/writearticle';
import Setting from '../../components/setting/setting';
import TagSetting from '../../pages/back/tagSetting/tagSetting.js';

import './Default.scss';
const history = createHashHistory();

const drawerWidth = 200;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
  },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    white: {
        color: '#fff !important'
    },
});

class Default extends React.Component{
    constructor() {
        super();
        this.state = {
            showModiyPass: false,       // 是否显示修改密码的输入框
            showLoginout: false,        // 是否显示退出的提示
            open: true,
            open1: false,
            open2: false,
            openLoginOut: false,        // 登出的弹出框
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
    handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    };
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
        let name = e.target.parentElement.parentElement.getAttribute('data-name'),
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
    handleClick = () => {
        this.setState(state => ({ open1: !state.open1 }));
    };
    handleToggle = () => {
        this.setState(state => ({ open2: !state.open2 }));
    };
    closeTip = () => {
        this.setState(state => ({ open2: false }));
    }
    handleLoginOut = () => {
        this.setState({ openLoginOut: true });
    };
    render() {
        const { activeIndex, open2 } = this.state;
        const { classes, theme, fullScreen } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                    >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                            >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            <a href={ this.props.website.siteUrl } className={ classes.white }>
                                { this.props.website.siteName }
                            </a>
                        </Typography>
                        <div>
                            <Button
                                buttonRef={node => {
                                this.anchorEl = node;
                                }}
                                aria-owns={open2 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                                设置
                            </Button>
                            <Popper open={open2} anchorEl={this.anchorEl} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                    <ClickAwayListener onClickAway={ this.closeTip }>
                                        <MenuList>
                                            <MenuItem onClick={ this.handleOpen }>修改密码</MenuItem>
                                            <MenuItem onClick={ this.showLoginout }>登出</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                    </Paper>
                                </Grow>
                                )}
                            </Popper>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                    >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {/* <List>
                        {['首页', '文章', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List> */}
                    <List>
                        <ListItem button key={0} component="a" href="#default/welcome">
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary='首页' />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={this.handleClick}>
                            <ListItemIcon>
                                <Description />
                            </ListItemIcon>
                            <ListItemText inset primary="文章" />
                            {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested} component="a" href="#default/showallarticle">
                                    <ListItemIcon>
                                        <DeveloperBoard />
                                    </ListItemIcon>
                                    <ListItemText inset primary="所有文章" />
                                </ListItem>
                                <ListItem button className={classes.nested} component="a" href="#default/writearticle">
                                    <ListItemIcon>
                                        <BorderColor />
                                    </ListItemIcon>
                                    <ListItemText inset primary="写文章" />
                                </ListItem>
                                <ListItem button className={classes.nested} component="a" href="#default/tagsetting">
                                    <ListItemIcon>
                                        <Loyalty />
                                    </ListItemIcon>
                                    <ListItemText inset primary="标签" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <List>
                        <ListItem button key={2} component="a" href="#default/setting">
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary='设置' />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/default/welcome" component={ Welcome }/>
                        <Route path="/default/showallarticle" component={ Showallarticle }/>
                        <Route path="/default/writearticle" component={ Writearticle }/>
                        <Route path="/default/setting" component={ Setting }/>
                        <Route path="/default/tagsetting" component={ TagSetting }/>
                    </Switch>
                </main>
                {/* 登出提示弹出框 */}
                <div>
                    <Dialog
                        fullScreen={ fullScreen }
                        open={ this.state.showLoginout }
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">
                            提示
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p>即将要登出，确定吗？</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.handleClose } color="secondary">
                                取消
                            </Button>
                            <Button onClick={ this.loginOut } color="primary" autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {/* 修改密码弹出框 */}
                <div>
                    <Dialog
                        fullScreen={ fullScreen }
                        open={ this.state.showModiyPass }
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">
                            提示
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <TextField
                                    id="filled-full-width"
                                    label="旧密码"
                                    style={{ margin: 8 }}
                                    placeholder="请输入旧密码"
                                    fullWidth
                                    data-name="oldPass"
                                    autoComplete="false"
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={ this.state.form.oldPass }
                                    onChange={ this.modifyInfo }
                                />
                                <TextField
                                    id="filled-full-width"
                                    label="新密码"
                                    style={{ margin: 8 }}
                                    placeholder="请输入新密码"
                                    fullWidth
                                    data-name="newPass1"
                                    autoComplete="false"
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={ this.state.form.newPass1 }
                                    onChange={ this.modifyInfo }
                                />
                                <TextField
                                    id="filled-full-width"
                                    label="新密码"
                                    style={{ margin: 8 }}
                                    placeholder="再一次输入新密码"
                                    fullWidth
                                    data-name="newPass2"
                                    autoComplete="false"
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={ this.state.form.newPass2 } 
                                    onChange={ this.modifyInfo }
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.handleClose } color="secondary">
                                取消
                            </Button>
                            <Button onClick={ this.confirmModifyPass } color="primary" autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}
Default.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Default));