import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Pagination } from 'semantic-ui-react';

import * as Http from '../../../api/http';
import TagAction from '../../../store/tags/tagsAction';
import Toastr from 'toastr';

import './tagSetting.scss';

let tagName = '';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    rootTable: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        // minWidth: 700,
    },
});

class TagSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: '',
            dialogVisible: false,       // 控制删除中的提示框
            updateVisible: false,       // 控制编辑弹出框
            oldTagName: '',
            newTagName: '',
        };
    }
    addNewTag = () => {
        let newTag = this.state.tagName.trim();

        if (!newTag) {
            Toastr.warning('请输入标签名称', '提示');

            return;
        }
        // this.props.addTag(this.state.tagName);
        Http.addTag(this.state.tagName).then((data) => {
            let da = data.data;

            if (da.result) {
                Toastr.success('增加成功!', '提示');
                // 成功后再刷新并清除输入框的数据
                this.props.getTags();
                this.setState({
                    tagName: ''
                });
            } else {
                Toastr.error('增加失败!', '提示');
            }
        }); 
    }
    modifyTagName = (e) => {
        this.setState({
            tagName: e.target.value
        });
    }
    modifyNewTagName = (e) => {
        this.setState({
            newTagName: e.target.value
        });
    }
    modifyRow = (e) => {
        tagName = e.target.parentElement.parentElement.getAttribute('data-id');

        this.setState({
            updateVisible: true,
            oldTagName: tagName || ''
        });
    }
    // 表格内删除按钮
    deleteRow = (e) => {
        tagName = e.target.parentElement.parentElement.getAttribute('data-id');

        this.setState({ dialogVisible: true });
    }
    // 删除table中的某条记录（标签）
    deleteTag = () => {
        this.setState({ dialogVisible: false });

        // this.props.removeTag(tagName);
        Http.removeTag(tagName).then((data) => {
            let da = data.data;
            
            if (da.result) {
                Toastr.success('删除成功!', '提示');
            } else {
                Toastr.error('删除失败!', '提示');
            }
            this.props.getTags();
        });
    }
    updateRow = (e) => {
        tagName = e.target.parentElement.getAttribute('data-id');

        this.setState({ updateVisible: true });
    }
    // 
    updateTag = () => {
        this.setState({
            updateVisible: false,
            newTagName: ''
        });

        // this.props.removeTag(tagName);
        Http.updateTag(tagName, this.state.newTagName).then((data) => {
            let da = data.data;
            
            if (da.result) {
                Toastr.success('修改成功!', '提示');
            } else {
                Toastr.error('修改失败!', '提示');
            }
            this.props.getTags();
        });
    }
    currentChange = (e, data) => {
        let curPage = data.activePage,
            start = (curPage - 1) * this.props.pageSize,
            end = curPage * this.props.pageSize;

        this.props.getTags(start, end);
    }
    render() {
        const { classes, fullScreen } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item sm={12} md={3}>
                        <div className="left-side">
                            <h4>标签</h4>
                            <div>
                                <TextField
                                    label="标签名称"
                                    style={{ margin: 8 }}
                                    placeholder="请输入标签名称"
                                    fullWidth
                                    margin="normal"
                                    autoComplete="false"
                                    data-name="siteUrl"
                                    value={ this.state.tagName }
                                    onChange={ this.modifyTagName }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button variant="contained" color="primary" className="setting-save" onClick={ this.addNewTag }>
                                    添加新标签
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={9}>
                        <Paper className={classes.rootTable}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">名称</TableCell>
                                        <TableCell align="center">数量</TableCell>
                                        <TableCell align="center">操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.tags.map((item, ind) => (
                                        <TableRow key={ ind }>
                                            <TableCell align="center">{ item.tagName }</TableCell>
                                            <TableCell align="center">{ item.tagNum }</TableCell>
                                            <TableCell align="center" data-id={ item.tagName }>
                                                <Button variant="contained" className="setting-save" onClick={ this.modifyRow } size="small">
                                                    编辑
                                                </Button>
                                                <Button variant="contained" color="secondary" className="setting-save" onClick={ this.deleteRow } size="small">
                                                    删除
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        {/* 分页 */}
                        <div className="text-center">
                            <Pagination
                                boundaryRange={0}
                                defaultActivePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={ Math.ceil(this.props.nums / 10) }
                                onPageChange={ this.currentChange }
                            />
                        </div>
                    </Grid>
                </Grid>
                {/* 编辑 tag 弹出框 */}
                <Dialog
                    fullScreen={ fullScreen }
                    open={ this.state.updateVisible }
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">
                        编辑
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component="div">
                            <TextField
                                label="旧标签名"
                                style={{ margin: 8 }}
                                placeholder="请输入旧标签名"
                                fullWidth
                                data-name="oldTagName"
                                autoComplete="false"
                                margin="normal"
                                disabled
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={ this.state.oldTagName }
                                onChange={ this.modifyInfo }
                            />
                            <TextField
                                label="新标签名"
                                style={{ margin: 8 }}
                                placeholder="请输入新标签名"
                                fullWidth
                                data-name="newTagName"
                                autoComplete="false"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={ this.state.newTagName }
                                onChange={ this.modifyNewTagName }
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({ updateVisible: false }) } color="secondary" size="small">
                            取消
                        </Button>
                        <Button onClick={ this.updateTag } color="primary" size="small">
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* 删除提示框 */}
                <Dialog
                    fullScreen={ fullScreen }
                    open={ this.state.dialogVisible }
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">
                        提示
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText component="div">
                            <p>即将要删除该标签，确定吗？</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({ dialogVisible: false }) } color="secondary">
                            取消
                        </Button>
                        <Button onClick={ this.deleteTag } color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    componentDidMount() {
        this.props.getTags();
    }
} 

const mapStateToProps = (state) => {
    return {
        tags: state.tags.data,
        pageSize: state.tags.pageSize,
        nums: state.tags.nums
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTags: (...args) => dispatch(TagAction.getTags(...args)),
        removeTag: (...args) => dispatch(TagAction.removeTag(...args)),
        updateTag: (...args) => dispatch(TagAction.updateTag(...args)),
        addTag: (...args) => dispatch(TagAction.addTag(...args))
    }
};

TagSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagSetting));