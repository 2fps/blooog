import React from 'react';
import { Link } from "react-router-dom";

import './articleBrief.css';

export default class ArticleBrief extends React.Component {

    render() {
        return (
            <div className="brief-card">
                <div className="brief-content">
                    <div className="brief-header">
                        <h2>
                            <Link to={`/detail/${this.props.article.articleId}`}>{ this.props.article.title }</Link>
                        </h2>
                    </div>
                    <div className="brief-meta">
                        <span className="brief-date">
                            <i className="glyphicon glyphicon-calendar"></i>&nbsp;
                            { this.props.article.publishTime }
                        </span>
                        <span className="brief-comments">
                            <i className="glyphicon glyphicon-comment"></i>&nbsp;
                            { this.props.article.commentNums }条评论
                        </span>
                        <span className="brief-read">
                            <i className="glyphicon glyphicon-eye-open"></i>&nbsp;
                            { this.props.article.readNums }次阅读
                        </span>
                    </div>
                    <div className="brief-description">{ this.props.article.brief }</div>
                </div>
                <div className="brief-extra">
                    <span>
                    <Link to={`/detail/${this.props.article.articleId}`}>阅读全文&nbsp;<i className="glyphicon glyphicon-chevron-down"></i></Link>
                    </span>
                </div>
            </div>
        );
    }
}