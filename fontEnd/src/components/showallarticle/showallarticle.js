import React from 'react';
import { Pagination, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import Toastr from 'toastr';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as Http from '../../api/http';
import { timeFormat } from '../../util/tool';

import filterAction from '../../store/filter/filterAction';

import './showallarticle.scss';

const history = createHashHistory();

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
        return (
            <div>
                <Paper className="all-article-container">
                    <Table className="all-article-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">文章名称</TableCell>
                                <TableCell align="center">发布日期</TableCell>
                                <TableCell align="center">阅读数</TableCell>
                                <TableCell align="center">点赞数</TableCell>
                                <TableCell align="center">编辑</TableCell>
                                <TableCell align="center">删除</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.props.articles.map((item, ind) => (
                                <TableRow key={ item.id } data-id={ item.articleId }>
                                    <TableCell align="center">{ item.title }</TableCell>
                                    <TableCell align="center">{ timeFormat(item.publishTime) }</TableCell>
                                    <TableCell align="center">{ item.viewNums }</TableCell>
                                    <TableCell align="center">{ item.likeNums }</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained"  onClick={ this.modifyRow }>编辑</Button>&nbsp;
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="secondary" onClick={ this.deleteRow } size="small">删除</Button>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </Paper>
{/*                 <Table striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>序号</Table.HeaderCell>
                            <Table.HeaderCell>文章名称</Table.HeaderCell>
                            <Table.HeaderCell>时间</Table.HeaderCell>
                            <Table.HeaderCell>阅读数</Table.HeaderCell>
                            <Table.HeaderCell>点赞数</Table.HeaderCell>
                            <Table.HeaderCell>操作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    { this.renderBody() }
                </Table> */}
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

                <Modal
                    open={ this.state.dialogVisible }
                    onClose={ () => this.setState({ dialogVisible: false }) }
                    size="tiny">
                    <Modal.Header>提示</Modal.Header>
                    <Modal.Content>
                        <p>确定删除吗？</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                        <Button positive onClick={ this.deleteArticle }>确定</Button>
                    </Modal.Actions>
                </Modal>
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

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllArticle);