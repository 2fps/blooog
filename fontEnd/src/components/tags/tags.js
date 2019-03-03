import React from 'react';
import { Button } from 'semantic-ui-react';

import './tags.scss';

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
    }
    showTags = () => {
        let temp = [];

        this.props.tags.forEach((item, ind) => {
            if (item.tagNum) {
                // 只显示有文章的标签
                temp.push(
                    <Button key={ ind } className="tag-item" size='tiny' content={ item.tagName } basic />
                );
            }
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