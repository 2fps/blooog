import React from 'react';
import { Pagination } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import Toastr from 'toastr';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as Http from '../../api/http';
import { timeFormat } from '../../util/tool';

import filterAction from '../../store/filter/filterAction';

import './showallarticle.scss';

const history = createHashHistory();

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        // minWidth: 700,
    },
});

// 用来保存被删除行的数据
let deleteRowId = '';

class ShowAllArticle extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            dialogVisible: false
        }
    }

    componentDidMount() {
        this.props.getArticles();
    }
    modifyRow = (e) => {
        let articleId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

        history.push('/default/writearticle');
        this.props.changeState('modify', articleId);
    }
    deleteRow = (e) => {
        let articleId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

        this.setState({ dialogVisible: true });
        deleteRowId = articleId;
    }

    deleteArticle = () => {
        this.setState({
            dialogVisible: false
        });
        Http.deleteArticle(deleteRowId).then((data) => {
            if (data.data.result) {
                Toastr.success('删除成功!', '提示');
                this.props.getArticles();
            } else {
                Toastr.error('删除失败!', '提示');
            }
        }, () => {
            Toastr.error('删除失败!', '提示');
        });
    }
    currentChange = (e, data) => {
        let curPage = data.activePage,
            start = (curPage - 1) * this.props.pageSize,
            end = curPage * this.props.pageSize;

        this.props.getArticles('', start, end);
    }
    render() {
        const { classes, fullScreen } = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">文章名称</TableCell>
                                <TableCell align="center">发布日期</TableCell>
                                <TableCell align="center">阅读数</TableCell>
                                <TableCell align="center">点赞数</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.props.articles.map((item, ind) => (
                                <TableRow key={ ind } data-id={ item.articleId }>
                                    <TableCell align="center">{ item.title }</TableCell>
                                    <TableCell align="center">{ timeFormat(item.publishTime) }</TableCell>
                                    <TableCell align="center">{ item.viewNums }</TableCell>
                                    <TableCell align="center">{ item.likeNums }</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained"  onClick={ this.modifyRow } size="small">编辑</Button>&nbsp;
                                        <Button variant="contained" color="secondary" onClick={ this.deleteRow } size="small">删除</Button>
                                    </TableCell>
                                </TableRow>
                            )) }
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
                            <p>即将要删除该文章，确定吗？</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({ dialogVisible: false }) } color="secondary">
                            取消
                        </Button>
                        <Button onClick={ this.deleteArticle } color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.filter.articles,
        nums: state.filter.nums,
        pageSize: state.filter.pageSize,
        articleState: state.filter.articleState
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles(...args)),
        changeState: (...args) => dispatch(filterAction.changeState(...args))
    }
};

ShowAllArticle.propTypes = {
    classes: PropTypes.object.isRequired,
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShowAllArticle));