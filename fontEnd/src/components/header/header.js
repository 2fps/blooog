import React from 'react';
import { Input, Menu } from 'semantic-ui-react';

import './header.css';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        };
    }
    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        });
    }
    render() {
        return (
            <header id="header" className="top-header">
                <div className="container clearfix">
                    <div className="site-name">
                        <h1>
                            <a id="logo" href="http://www.zhuyuntao.cn/">zyt</a>
                        </h1>
                    </div>
                    <div id="nav" className="site-choice">
                        <Menu secondary>
                            <Menu.Item name='home' active={this.activeItem === 'home'} onClick={this.handleItemClick} />
                            <Menu.Item
                                name='messages'
                                active={this.activeItem === 'messages'}
                                onClick={this.handleItemClick}
                                />
                            <Menu.Item
                                name='friends'
                                active={this.activeItem === 'friends'}
                                onClick={this.handleItemClick}
                                />
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Input icon='search' placeholder='Search...' />
                                </Menu.Item>
                                <Menu.Item
                                    name='logout'
                                    active={this.activeItem === 'logout'}
                                    onClick={this.handleItemClick}
                                />
                            </Menu.Menu>
                        </Menu>
                    </div>
                </div>
            </header>
        );
    }
}