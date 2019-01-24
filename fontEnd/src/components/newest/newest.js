import React from 'react';

import './newest.css';

export default class Newest extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="newest">
                <div className="newest-head">
                    <span className="newest-title">最新文章</span>
                </div>
                <div className="newest-content">
                    <ul className="newest-list">
                        <li className="newest-item">
                            <a>Typecho主题 - Initial 简约而不简单（更新v2.4.2版）</a>
                        </li>
                        <li className="newest-item">
                            <a>Initial主题简要使用指南</a>
                        </li>
                        <li className="newest-item">
                            <a>Typecho评论者主页链接新窗口打开（非修改程序）</a>
                        </li>
                        <li className="newest-item">
                            <a>Typecho文章和页面内的外链接使用新窗口打开（优化版）</a>
                        </li>
                        <li className="newest-item">
                            <a>Typecho文章和页面内的外链接使用新窗口打开（优化版）</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}