import React from 'react';
import { connect } from 'react-redux';
import Editor from 'for-editor';

import { Message } from 'element-react';
import {
    Form, 
    Input, 
    Button } from 'semantic-ui-react'

import * as Http from '../../api/http';
import filterAction from '../../store/filter/filterAction';

import './writearticle.css';

class WriteArticle extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            form: {},
            title: '',
            art: {
                title: ''
            }
        }
    }
    handleChange(value) {
        this.setState({
            value
        })
    }
    onChange = (e, data) => {
        let name = e.target.parentElement.getAttribute('data-name'),
            value = data.value;

        this.setState({
            title: value
        });
    }
    saveArticle = () => {
        let condition = {};
        
        condition.mdContent = this.state.value;
        condition.title = this.state.title;
        condition.htmlContent = document.getElementsByClassName('for-preview for-markdown-preview')[0].innerHTML;

        if ('modify' === this.props.articleState) {
            // 标记id
            condition.articleId = this.props.modifyId

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
                        title: info.data.title
                    });
                }
            });
        }
    }
    componentWillUnmount() {
        this.props.changeState('', '');
    }
    render() {
        const { value } = this.state;

        return (
            <div className="welcome">
                <Form>
                    <Form.Field inline>
                        <label className="setting-field">文章名</label>
                        <Input value={ this.state.title } data-name="siteName" onChange={ this.onChange } placeholder='请输入文章名' />
                    </Form.Field>
                    <Form.Field inline>
                        <label className="setting-field"></label>
                        <Button content='发布' secondary onClick={ this.saveArticle } />
                    </Form.Field>
                    <Form.Field inline>
                    </Form.Field>
                </Form>
                <Editor value={value} onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

function handleSuccess(data) {
    let da = data.data;

    if (da.result) {
        Message({
            message: '发布成功',
            type: 'success'
        });
    } else {
        handleError();
    }
}

function handleError() {
    Message({
        message: '发布失败',
        type: 'error'
    });
}

const mapStateToProps = (state) => {
    return {
        articles: state.filter.articles,
        articleState: state.filter.articleState,
        modifyId: state.filter.modifyId,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeState: (...args) => dispatch(filterAction.changeState(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);