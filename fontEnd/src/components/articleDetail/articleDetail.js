import React from 'react';
import { connect } from 'react-redux';

import filterAction from '../../store/filter/filterAction';

import * as Http from '../../api/http';

import './articleDetail.css';

let articleId = '';     // 当前articleId

class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            htmlContent: ''
        };
    }
    componentDidMount() {
        articleId = this.props.match.params.articleId;

        if (articleId) {
            // 有id号则去查询
            this.getArticleDetail(articleId);
        }
    }
    componentWillReceiveProps(nextProp) {
        if (articleId !== nextProp.match.params.articleId &&
            articleId != '') {
            articleId = nextProp.match.params.articleId;
            this.getArticleDetail(articleId);
        }
    }
    getArticleDetail = (id) => {
        Http.getArticleById(id).then((data) => {
            let da = data.data;

            if (da.result) {
                this.setState({
                    title: da.data.title,
                    htmlContent: da.data.htmlContent
                });
            }
        });
    }
    render() {
        return (
            <div className="article-detail">
                <div className="article-head">
                    <div className="article-title">
                        <h1>{ this.state.title }</h1>
                    </div>
{/*                     <div className="article-meta">
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
                    </div> */}
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
                <div className="article-foot">

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.filter.article
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getArticleDetail: (...args) => dispatch(filterAction.getArticleDetail(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);