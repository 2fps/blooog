import React from 'react';
import { connect } from 'react-redux';
import Editor from 'for-editor';
import Toastr from 'toastr';
import tagsAction from '../../store/tags/tagsAction';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import marked from 'marked';

import * as Http from '../../api/http';
import filterAction from '../../store/filter/filterAction';

import './writearticle.scss';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tagRoot: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    noLabel: {
      marginTop: theme.spacing.unit * 3,
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    handleChangeEditor(value) {
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
        // 保存文章 tags 的id号

        condition.tagsId = [];
        this.state.tags.forEach((item, ind) => {
            condition.tagsId.push(this.props.nameToId[ item ]);
        });

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
    handleChange = event => {
        this.setState({ tags: event.target.value });
    }
    render() {
        const { value } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h4>写文章</h4>
                <Grid container spacing={24}>
                    <Grid item md={8} sm={12}>
                        <TextField
                            label="文章名"
                            style={{ margin: 8 }}
                            placeholder="请输入文章名"
                            fullWidth
                            data-name="title"
                            autoComplete="false"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={ this.state.title } 
                            onChange={ this.onChange }
                        />
                    </Grid>
                    <Grid item md={9} sm={12}>
                        <Editor value={value} onChange={this.handleChangeEditor.bind(this)}/>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <p>
                            <Button variant="contained" color="primary" onClick={ this.saveArticle }>
                                发布
                            </Button>
                        </p>
                        <div>
                            <h4>标签</h4>
                            {/* <Dropdown fluid multiple selection options={ this.props.tagFilter } value={ this.state.tags } onChange={ this.changeTag } /> */}
                            <div className={classes.tagRoot}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                                    <Select
                                        multiple
                                        value={ this.state.tags }
                                        onChange={ this.handleChange }
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {this.props.tagFilter.map(name => (
                                            <MenuItem key={name} value={name} >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </Grid>
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
        nameToId: state.tags.nameToId,
        tagFilter: state.tags.tagFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeState: (...args) => dispatch(filterAction.changeState(...args)),
        getTags: (...args) => dispatch(tagsAction.getTags(...args))
    }
};

WriteArticle.propTypes = {
    classes: PropTypes.object.isRequired,
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WriteArticle));