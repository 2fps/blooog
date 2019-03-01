import React from 'react';
import { connect } from 'react-redux';

import {
    Switch,
    Route
} from 'react-router-dom';
import { Responsive, Segment } from 'semantic-ui-react'

import AllArticles from '../../components/allArticles/allArticles';
import Header from '../../components/header/header';
// import Tags from '../../components/tags/tags';
import Newest from '../../components/newest/newest';
import Footer from '../../components/footer/footer';
import ArticleDetail from '../../components/articleDetail/articleDetail';

import tagsAction from '../../store/tags/tagsAction';
import filterAction from '../../store/filter/filterAction';
import websiteAction from '../../store/website/websiteAction';


import './Index.scss';
// import '../../static/css/bootstrap.min.css';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // tags: []
        };
    }
    componentDidMount() {
        // this.props.getTags();
        this.props.getNewestArticle();
        this.props.getWebsiteConifg();
        // 计算，获取文章
        let start = (this.props.nowPage - 1) * this.props.pageSize,
            end = this.props.nowPage * this.props.pageSize;
        this.props.getArticles('', start, end);
    }
    render() {
        return (
            <div>
                <Header
                    website={ this.props.website }
                    />
                <Segment.Group className="content-container">
                    <Responsive className="article-info" minWidth={768}>
                        <Newest
                            newest={ this.props.newestArticles }
                            />
                        {/* <Tags
                            tags={ this.props.tags }
                            /> */}
                    </Responsive>
                    <Responsive className="content-brief">
                        <Route path="/index/main" component={ AllArticles }/>
                        <Route exat path="/index/detail/:articleId" component={ ArticleDetail }/>
                        {/* <Route exat path="/filter" component={ Filter }/> */}
                    </Responsive>
                </Segment.Group>
                <Footer website={ this.props.website } />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tags,
        newestArticles: state.filter.newestArticles,
        website: state.website,                 // 站点配置信息
        pageSize: state.filter.pageSize,
        nowPage: state.filter.nowPage
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取标签数据
        getTags: (...args) => dispatch(tagsAction.getTags(...args)),
        getNewestArticle: (...args) => dispatch(filterAction.getNewestArticle(...args)),
        // 获取站点信息
        getWebsiteConifg: () => dispatch(websiteAction.getConfig()),
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Index);