import React from 'react';
import { Link } from "react-router-dom";
import './newest.scss';

export default class Newest extends React.Component {
    renderItem = () => {
        let temp = [];

        this.props.newest.forEach((item, ind) => {
            temp.push(
                <li className="newest-item" key={ ind }>
                    <Link to={`/index/detail/${item['_id']}`}>{ item.title }</Link>
                </li>
            );
        });

        return (
            <ul className="newest-list">
                { temp }
            </ul>
        );
    }
    render() {
        return (
            <div className="newest">
                <div className="newest-head">
                    <span className="newest-title">最新文章</span>
                </div>
                <div className="newest-content">
                    { this.renderItem() }
                </div>
            </div>
        );
    }
}