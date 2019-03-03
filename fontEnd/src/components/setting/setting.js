import React from 'react';
import { connect } from 'react-redux';

import {
    Form, 
    Input, 
    Button } from 'semantic-ui-react';

import websiteAction from '../../store/website/websiteAction';

import './setting.scss';

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }
      
    onChange = (e, data) => {
        let name = e.target.parentElement.getAttribute('data-name'),
            value = data.value;

        this.props.modifyWebsiteConfig(name, value);
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
            <Form>
                <Form.Field inline>
                    <label className="setting-field">站点名称</label>
                    <Input className="wd-400" value={ this.props.website.siteName } data-name="siteName" onChange={ this.onChange } placeholder='请输入站点名称' />
                </Form.Field>
                <Form.Field inline>
                    <label className="setting-field">站点副标题</label>
                    <Input className="wd-400" value={ this.props.website.subTitle } data-name="subTitle" onChange={ this.onChange } placeholder='请输入站点副标题' />
                </Form.Field>
                <Form.Field inline>
                    <label className="setting-field">站点url</label>
                    <Input className="wd-400" value={ this.props.website.siteUrl } data-name="siteUrl" onChange={ this.onChange } placeholder='请输入站点url' />
                </Form.Field>
                <Form.Field inline>
                    <label className="setting-field">网站备案号</label>
                    <Input className="wd-400" value={ this.props.website.webRecord } data-name="webRecord" onChange={ this.onChange } placeholder='请输入网站备案号（可不输）' />
                </Form.Field>
                <Form.Field inline>
                    <label className="setting-field"></label>
                    <Button content='保存' primary onClick={ this.save } />
                </Form.Field>
            </Form>
        )
    }
}


const mapStateToProps = (state) => {
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