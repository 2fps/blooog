import React from 'react';
import { connect } from 'react-redux';

import {
    Switch,
    Route
} from 'react-router-dom';

import AllArticles from '../../components/allArticles/allArticles';
import Header from '../../components/header/header';
// import Tags from '../../components/tags/tags';
import Newest from '../../components/newest/newest';
import Footer from '../../components/footer/footer';
import ArticleDetail from '../../components/articleDetail/articleDetail';

import tagsAction from '../../store/tags/tagsAction';
import filterAction from '../../store/filter/filterAction';
import websiteAction from '../../store/website/websiteAction';

import Filter from '../Filter/Filter';

import './Index.css';
import '../../static/css/bootstrap.min.css';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // tags: []
        };
    }
    componentDidMount() {
        this.props.getTags();
        this.props.getNewestArticle();
        this.props.getWebsiteConifg();
        this.props.getArticles();
    }
    render() {
        return (
            <div>
                <Header
                    website={ this.props.website }
                    />
                <div className="content-container">
                    <div className="col-sm-8 col-xs-12 content-brief">
                        <Switch>
                            <Route path="/" component={ AllArticles }/>
                            <Route path="/detail/:articleId" component={ ArticleDetail }/>
                            <Route path="/filter" component={ Filter }/>
                        </Switch>
                    </div>
                    <div className="col-sm-4 col-xs-0 article-info">
                        <Newest
                            newest={ this.props.newestArticles }
                            />
                        {/* <Tags
                            tags={ this.props.tags }
                            /> */}
                    </div>
                </div>
                <Footer website={ this.props.website } />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // tags: state.tags,
        newestArticles: state.filter.newestArticles,
        website: state.website                          // 站点配置信息
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取标签数据
        getTags: (...args) => dispatch(tagsAction.getTags(...args)),
        getNewestArticle: (...args) => dispatch(filterAction.getNewestArticle(...args)),
        // 获取站点信息
        getWebsiteConifg: (...args) => dispatch(websiteAction.getConfig()),
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles())
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Index);