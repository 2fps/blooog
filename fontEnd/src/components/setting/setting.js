import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import websiteAction from '../../store/website/websiteAction';

import './setting.scss';

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }
      
    onChange = (e, data) => {
        let name = e.target.parentElement.parentElement.getAttribute('data-name'),
            value = e.target.value;

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
            <div>
                <TextField
                    id="filled-full-width"
                    label="站点名称"
                    style={{ margin: 8 }}
                    placeholder="请输入站点名称"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    autoComplete="false"
                    data-name="siteName"
                    value={ this.props.website.siteName }
                    onChange={ this.onChange }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="filled-full-width"
                    label="站点副标题"
                    style={{ margin: 8 }}
                    placeholder="请输入站点副标题"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    autoComplete="false"
                    data-name="subTitle"
                    value={ this.props.website.subTitle }
                    onChange={ this.onChange }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="filled-full-width"
                    label="站点url"
                    style={{ margin: 8 }}
                    placeholder="请输入站点url"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    autoComplete="false"
                    data-name="siteUrl"
                    value={ this.props.website.siteUrl }
                    onChange={ this.onChange }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="filled-full-width"
                    label="网站备案号"
                    style={{ margin: 8 }}
                    placeholder="请输入网站备案号（可不输）"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    autoComplete="false"
                    data-name="webRecord"
                    value={ this.props.website.webRecord }
                    onChange={ this.onChange }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" className="setting-save" onClick={ this.save }>
                    保存
                </Button>
            </div>

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