import React from 'react';

import './tags.scss';

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
    }
    showTags = () => {
        let temp = [];

        this.props.tags.forEach((item, ind) => {
            temp.push(
                <span className="tags-item" key={ ind }>
                    <a title={ item.alias }>{ item.name }</a>
                </span>
            );
        });

        return (
            <div className="tags-content">
                { temp }
            </div>
        );
    }
    render() {
        return (
            <div className="article-tags">
                <div className="tags-head">
                    <span className="tags-title">标签</span>
                </div>
                { this.showTags() }
            </div>
        );
    }
}