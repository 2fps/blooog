import React from 'react';
import { connect } from 'react-redux';
import Editor from 'for-editor';
import Toastr from 'toastr';
import tagsAction from '../../store/tags/tagsAction';
import marked from 'marked';

import {
    Form, 
    Input, 
    Grid,
    Dropdown,
    Button } from 'semantic-ui-react'

import * as Http from '../../api/http';
import filterAction from '../../store/filter/filterAction';

import './writearticle.scss';

class WriteArticle extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            form: {},
            title: '',
            art: {
                title: ''
            },
            tags: []
        };
    }
    handleChange(value) {
        this.setState({
            value
        });
    }
    onChange = (e) => {
        let value = e.target.value;

        this.setState({
            title: value
        });
    }
    saveArticle = () => {
        let condition = {};
        
        condition.mdContent = this.state.value;
        condition.title = this.state.title;
        condition.htmlContent = marked(this.state.value);
        // 增加文章的tags
        condition.tagsId = this.state.tags;

        if ('modify' === this.props.articleState) {
            // 标记id
            condition.articleId = this.props.modifyId;

            Http.modifyArticleById(condition).then(handleSuccess, handleError);

            return;
        }


        Http.saveArticle(condition).then(handleSuccess, handleError);
    }
    componentDidMount() {
        // 编辑的话，需要重新获取文章信息
        if ('modify' === this.props.articleState) {
            // 恢复
            Http.getArticleById(this.props.modifyId).then((data) => {
                let info = data.data;

                if (info.result) {
                    this.setState({
                        value: info.data.mdContent,
                        title: info.data.title,
                        tags: info.data.tagsId
                    });
                }
            });
        }
        this.props.getTags();
    }
    componentWillUnmount() {
        this.props.changeState('', '');
    }
    changeTag = (e, data) => {
        let tags = data.value;

        this.setState({
            tags
        });
    }
    render() {
        const { value } = this.state;

        return (
            <div className="welcome">
                <Form>
                    <Form.Field inline>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <label className="setting-field">文章名</label>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <input value={ this.state.title } onChange={ this.onChange } placeholder='请输入文章名' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form.Field>
                    <Form.Field inline></Form.Field>
                </Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Editor value={value} onChange={this.handleChange.bind(this)}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>
                                <Button content='发布' primary onClick={ this.saveArticle } />
                            </p>
                            <div>
                                <h4>标签</h4>
                                <Dropdown fluid multiple selection options={ this.props.tagFilter } value={ this.state.tags } onChange={ this.changeTag } />
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

function handleSuccess(data) {
    let da = data.data;

    if (da.result) {
        Toastr.success('发布成功!', '提示');
    } else {
        handleError();
    }
}

function handleError() {
    Toastr.error('发布失败!', '提示');
}

const mapStateToProps = (state) => {
    return {
        articles: state.filter.articles,
        articleState: state.filter.articleState,
        modifyId: state.filter.modifyId,
        tagFilter: state.tags.tagFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeState: (...args) => dispatch(filterAction.changeState(...args)),
        getTags: (...args) => dispatch(tagsAction.getTags(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);