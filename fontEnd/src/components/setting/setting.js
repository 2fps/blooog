import React from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button} from 'element-react';


import websiteAction from '../../store/website/websiteAction';

import './setting.css';

class Setting extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            form: {
            }
        };
    }
    onSubmit(e) {
        e.preventDefault();
    }
      
    onChange(key, value) {
        this.props.modifyWebsiteConfig(key, value);
    }
    componentDidMount() {
        this.props.getWebsiteConifg();
    }
    // 保存setting
    save = () => {
        let condition = {
            siteName: this.props.website.siteName,
            subTitle: this.props.website.subTitle,
            siteUrl: this.props.website.siteUrl,
            webRecord: this.props.website.webRecord,
        };

        this.props.saveWebsiteConfig(condition);
    }
    render() {
        return (
            <Form model={this.state.form} labelWidth="100" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item label="站点名称">
                    <Input value={ this.props.website.siteName } onChange={this.onChange.bind(this, 'siteName')} placeholder="请输入站点名称"></Input>
                </Form.Item>
                <Form.Item label="站点副标题">
                    <Input value={ this.props.website.subTitle } onChange={this.onChange.bind(this, 'subTitle')} placeholder="请输入站点副标题"></Input>
                </Form.Item>
                <Form.Item label="站点url">
                    <Input value={ this.props.website.siteUrl } onChange={this.onChange.bind(this, 'siteUrl')} placeholder="请输入站点url"></Input>
                </Form.Item>
{/*                 <Form.Item label="站点副标题">
                    <Select value={this.state.form.region} placeholder="请选择活动区域">
                        <Select.Option label="区域一" value="shanghai"></Select.Option>
                        <Select.Option label="区域二" value="beijing"></Select.Option>
                    </Select>
                </Form.Item> */}
                <Form.Item label="网站备案号">
                    <Input value={ this.props.website.webRecord } onChange={this.onChange.bind(this, 'webRecord')} placeholder="请输入网站备案号（可不输）"></Input>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" nativeType="button" onClick={ this.save }>保存</Button>
                </Form.Item>
            </Form>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state.website.modifyConfig.siteName);
    return {
        website: state.website.modifyConfig     // 站点配置信息
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getWebsiteConifg: (...args) => dispatch(websiteAction.getConfig()),
        modifyWebsiteConfig: (...args) => dispatch(websiteAction.modifyWebsiteConfig(...args)),
        saveWebsiteConfig: (...args) => dispatch(websiteAction.saveWebsiteConfig(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Setting);