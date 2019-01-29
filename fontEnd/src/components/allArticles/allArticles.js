import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'element-react';

import ArticleBrief from '../articleBrief/articleBrief';
import filterAction from '../../store/filter/filterAction';

import './allArticles.css';

class AllArticles extends React.Component {
    componentDidMount() {
        this.props.getArticles();
    }
    renderArticle = () => {
        let temp = [];

        this.props.articles.forEach((art, ind) => {
            temp.push(
                <ArticleBrief key={ ind } article={ art } />
            );
        });

        return (
            <div>
                { temp }
            </div>
        );
    }
    currentChange = (curPage) => {

        
        let start = (curPage - 1) * this.props.pageSize,
            end = curPage * this.props.pageSize;
        this.props.getArticles('', start, end);
    }

    render() {
        return (
            <div className="brief-card">
                { this.renderArticle() }
                <Pagination layout="prev, pager, next" total={ this.props.nums } small={true} onCurrentChange={ this.currentChange } />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.filter.articles,
        nums: state.filter.nums,
        pageSize: state.filter.pageSize
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);