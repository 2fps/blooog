import React from 'react';
import { connect } from 'react-redux';
import Editor from 'for-editor';

import { Form, Input, Button, Message } from 'element-react';

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
    onChange(key, val) {
        this.setState({
            [key]: val
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

            Http.modifyArticleById(condition).then(() => {
                
            });

            return;
        }


        Http.saveArticle(condition).then(() => {
            Message({
                message: '发布成功',
                type: 'success'
            });
        }, () => {
            Message.error('发布失败');
        });
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
                debugger;
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
                <Form model={this.state.form} labelWidth="100">
                    <Form.Item label="文章名">
                        <Input value={ this.state.title } onChange={this.onChange.bind(this, 'title')} placeholder="请输入文章名"></Input>
                    </Form.Item>
                    <Editor value={value} onChange={this.handleChange.bind(this)}/>
                    <Form.Item>
                        <Button type="primary" nativeType="button" onClick={ this.saveArticle }>保存</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
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