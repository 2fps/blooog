import React from 'react';
import { Button, Dialog, Message } from 'element-react';
import { Table, Pagination } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import * as Http from '../../api/http';

import filterAction from '../../store/filter/filterAction';

import './showallarticle.css';

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
        let _id = e.target.parentElement.parentElement.getAttribute('data-id');

        history.push('/default/writearticle');
        this.props.changeState('modify', _id);
    }
    deleteRow = (e) => {
        let _id = e.target.parentElement.parentElement.getAttribute('data-id');

        this.setState({ dialogVisible: true });
        deleteRowId = _id;
    }

    deleteArticle = () => {
        this.setState({
            dialogVisible: false
        });
        Http.deleteArticle(deleteRowId).then((data) => {
            if (data.data.result) {
                Message({
                    message: '删除成功',
                    type: 'success'
                });
                this.props.getArticles();
            } else {
                Message.error('删除失败');
            }
        }, () => {
            Message.error('删除失败');
        });
    }
    currentChange = (e, data) => {
        let curPage = data.activePage,
            start = (curPage - 1) * this.props.pageSize,
            end = curPage * this.props.pageSize;

        this.props.getArticles('', start, end);
    }

    renderBody = () => {
        let temp = [];

        this.props.articles.forEach((item, ind) => {
            temp.push(
                <Table.Row key={ ind }>
                    <Table.Cell>{ ind + 1 }</Table.Cell>
                    <Table.Cell>{ item.title }</Table.Cell>
                    <Table.Cell data-id={ item['_id'] }>
                        <Button plain={true} type="info" onClick={ this.modifyRow } size="small">编辑</Button>
                        <Button type="danger" onClick={ this.deleteRow } size="small">删除</Button>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return (
            <Table.Body>
                { temp }
            </Table.Body>
        );
    }
    render() {
        return (
            <div>
                <Table striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>序号</Table.HeaderCell>
                            <Table.HeaderCell>文章名称</Table.HeaderCell>
                            <Table.HeaderCell>操作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    { this.renderBody() }
                </Table>
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
                    title="提示"
                    size="tiny"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                    <span>是否删除？</span>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                        <Button type="danger" onClick={ this.deleteArticle }>确定</Button>
                    </Dialog.Footer>
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

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllArticle);