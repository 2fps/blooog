import React from 'react';
import { Link } from "react-router-dom";

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import './header.css';

let scrollFn = function() {};

export default class index extends React.Component {
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
    render() {
        return (
            <header id="header" ref="header" className="top-header">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">zzz</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#login">
                                {/* <Link to="/login">登录</Link> */}登录
                            </NavItem>
                            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}