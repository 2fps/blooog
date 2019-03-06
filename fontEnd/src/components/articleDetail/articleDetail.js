import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import filterAction from '../../store/filter/filterAction';
import Chip from '@material-ui/core/Chip';
// svg图标
import Today from '@material-ui/icons/Today';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Visibility from '@material-ui/icons/Visibility';

import * as Http from '../../api/http';
import { timeFormat } from '../../util/tool';

import './articleDetail.scss';
import '../../css/md.css';

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
        Http.getArticleById(id, true).then((data) => {
            let da = data.data;

            if (da.result) {
                this.setState({
                    title: da.data.title,
                    htmlContent: da.data.htmlContent,
                    publishTime: da.data.publishTime,
                    likeNums: da.data.likeNums,
                    viewNums: da.data.viewNums,
                    tagsId: da.data.tagsId
                });
            }
        });
    }
    renderTags = () => {
        let tagTemp = [],
            tagIdToName = this.props.tagIdToName || {};

        if (!this.state.tagsId) {
            return;
        }
        this.state.tagsId.forEach((id, key) => {
            tagTemp.push(
                <Chip
                    key={ key }
                    label={ tagIdToName[ id ] }
                    className="tag-item"
                    component="a"
                    clickable
                    variant="outlined"
                    />
            );
        });

        return (
            <div>
                { tagTemp }
            </div>
        );
    }
    likeIt = () => {
        Http.likeArticle(articleId).then((data) => {
            if (data.data.result) {
                let likeNums = this.state.likeNums + 1;

                // 处理成功，+ 1
                this.setState({
                    likeNums
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
                    <div className="article-meta">
                        <span className="article-subInfo">
                            <Today className="icon-detail" />&nbsp;
                            { timeFormat(this.state.publishTime) }
                        </span>
                        <span className="article-subInfo">
                            <Visibility className="icon-detail" />&nbsp;
                            { this.state.viewNums }次阅读
                        </span>
                        <span className="article-subInfo">
                            <ThumbUp className="icon-detail" />&nbsp;
                            { this.state.likeNums }次点赞
                        </span>
{/*                         <span className="brief-comments">
                            <i className="glyphicon glyphicon-comment"></i>&nbsp;
                            { this.props.article.commentNums }条评论
                        </span> */}
                    </div>
                </div>
                <div className="markdown-body">
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
                </div>
                <div className="article-foot">
                    <Button variant="outlined" color="secondary" onClick={ this.likeIt }>
                        点赞
                    </Button>
                </div>
                {/* 渲染tags */}
                { this.renderTags() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.filter.article,
        tagIdToName: state.tags.idToName
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getArticleDetail: (...args) => dispatch(filterAction.getArticleDetail(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);