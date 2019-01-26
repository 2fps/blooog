import React from 'react';

import { Form, Input, Select, DatePicker, Layout, Checkbox, Switch, TimePicker, Radio, Button} from 'element-react';

import './setting.css';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            name: '',
            region: '',
            date1: null,
            date2: null,
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        };
    }
    onSubmit(e) {
        e.preventDefault();
    }
      
      onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        return (
            <Form model={this.state.form} labelWidth="100" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item label="站点名称">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder="请输入站点名称"></Input>
                </Form.Item>
                <Form.Item label="站点副标题">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder="请输入站点副标题"></Input>
                </Form.Item>
                <Form.Item label="站点url">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder="请输入站点url"></Input>
                </Form.Item>
{/*                 <Form.Item label="站点副标题">
                    <Select value={this.state.form.region} placeholder="请选择活动区域">
                        <Select.Option label="区域一" value="shanghai"></Select.Option>
                        <Select.Option label="区域二" value="beijing"></Select.Option>
                    </Select>
                </Form.Item> */}
                <Form.Item label="网站备案号">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder="请输入网站备案号（可不输）"></Input>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" nativeType="submit">保存</Button>
                </Form.Item>
            </Form>
        )
    }
}