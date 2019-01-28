import React from 'react';
import Editor from 'for-editor';
import { Form, Input, Button} from 'element-react';

import * as Http from '../../api/http';

import './writearticle.css';

export default class WriteArticle extends React.Component {
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

        Http.saveArticle(condition);
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