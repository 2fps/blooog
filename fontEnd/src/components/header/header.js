import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { createHashHistory } from 'history';

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
        window.addEventListener('scroll', scrollFn = () => {
            let rate = Math.min(window.scrollY / 100, 1),
                padding = (1 - rate) * 15;

            me.refs.header.style.paddingTop = padding + 'px';
            me.refs.header.style.paddingBottom = padding + 'px';
        });
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
            <header id="header" ref="header" className="top-header">
                <Menu secondary pointing className="container">
                    <Menu.Menu position='left'>
                        <h2>
                            <a className="color-fff" href={ this.props.website.modifyConfig.siteUrl }>{ this.props.website.modifyConfig.siteName }</a>
                        </h2>
                    </Menu.Menu>
                    <Menu.Menu position='right'>
{/*                         <Menu.Item name='home' active={ this.state.activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item
                            name='messages'
                            active={this.state.activeItem === 'messages'}
                            onClick={this.handleItemClick}
                            /> */}
                        <Menu.Item className="color-fff"
                            name='登录'
                            active={this.state.activeItem === 'logout'}
                            onClick={ this.goToLogin }
                        />
                    </Menu.Menu>
                </Menu>
            </header>
        );
    }
}