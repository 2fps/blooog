import React from 'react';

import './articleBrief.css';

export default class ArticleBrief extends React.Component {

    render() {
        return (
            <div className="brief-card">
                <div className="brief-content">
                    <div className="brief-header">
                        <h2>我是文章的题目</h2>
                    </div>
                    <div className="brief-meta">
                        <span className="brief-date">2015.04.23</span>&nbsp;
                        <span className="brief-comments">39</span>条评论&nbsp;
                        <span className="brief-date">123</span>次阅读
                    </div>
                    <div className="brief-description">我是文章的缩略内容，最大字数可以后台修改</div>
                </div>
                <div className="brief-extra">
                </div>
            </div>
        );
    }
}