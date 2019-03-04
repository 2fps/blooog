import React from 'react';
import { Input, Modal, Button, Form, Table, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Http from '../../../api/http';
import TagAction from '../../../store/tags/tagsAction';
import Toastr from 'toastr';

import './tagSetting.scss';

let tagName = '';
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
    renderTableBody() {
        let temp = [];

        this.props.tags.forEach((item, ind) => {
            temp.push(
                <Table.Row key={ ind }>
                    <Table.Cell>{ item.tagName }</Table.Cell>
                    <Table.Cell>{ item.tagNum }</Table.Cell>
                    <Table.Cell data-id={ item.tagName }>
                        <Button onClick={ this.modifyRow } size="small">编辑</Button>
                        <Button color="red" onClick={ this.deleteRow } size="small">删除</Button>
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
        tagName = e.target.parentElement.getAttribute('data-id');

        this.setState({
            updateVisible: true,
            oldTagName: tagName
        });
    }
    // 表格内删除按钮
    deleteRow = (e) => {
        tagName = e.target.parentElement.getAttribute('data-id');

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
        return (
            <div className="side-con">
                <div className="left-side">
                    <p className="side-title">标签</p>
                    <h4>添加新标签</h4>
                    <div>
                        <Form>
                            <Form.Field>
                                <label>名称</label>
                                <input placeholder='输入标签名称' value={ this.state.tagName } onChange={ this.modifyTagName } />
                            </Form.Field>
                            <Form.Field>
                                <Button primary onClick={ this.addNewTag }>添加新标签</Button>
                            </Form.Field>
                        </Form>
                    </div>
                </div>
                <div className="left-right">
                    <Table striped selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>名称</Table.HeaderCell>
                                <Table.HeaderCell>数量</Table.HeaderCell>
                                <Table.HeaderCell>操作</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        { this.renderTableBody() }
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
                </div>
                {/* 编辑提示框 */}
                <Modal
                    open={ this.state.updateVisible }
                    onClose={ () => this.setState({ updateVisible: false }) }
                    size="tiny">
                    <Modal.Header>编辑提示</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>First Name</label>
                                <input disabled value={ this.state.oldTagName } />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input placeholder='新标签名' value={ this.state.newTagName } onChange={ this.modifyNewTagName } />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={ () => this.setState({ updateVisible: false }) }>取消</Button>
                        <Button positive onClick={ this.updateTag }>确定</Button>
                    </Modal.Actions>
                </Modal>

                {/* 删除提示框 */}
                <Modal
                    open={ this.state.dialogVisible }
                    onClose={ () => this.setState({ dialogVisible: false }) }
                    size="tiny">
                    <Modal.Header>删除提示</Modal.Header>
                    <Modal.Content>
                        <p>确定删除吗？</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                        <Button positive onClick={ this.deleteTag }>确定</Button>
                    </Modal.Actions>
                </Modal>
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

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(TagSetting);