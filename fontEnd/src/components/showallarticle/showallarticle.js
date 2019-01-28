import React from 'react';
import { Table, Icon, Tag, Button, Dialog } from 'element-react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import * as Http from '../../api/http';

import filterAction from '../../store/filter/filterAction';

import './showallarticle.css';

const history = createHashHistory();

// 用来保存被删除行的数据
let deleteRowData = null;

class ShowAllArticle extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
                type: 'index'
            },
            {
              label: "文章名",
              prop: "date",
              render: function(data){
                return (
                <span>
                    <span style={{marginLeft: '10px'}}>{data.title}</span>
                </span>)
              }
            },
            {
              label: "操作",
              prop: "address",
              width: 300,
              render: (row) => {
                return (
                    <span>
                        <Button plain={true} type="info" onClick={ this.modifyRow.bind(this, row) } size="small">编辑</Button>
                        <Button type="danger" onClick={ this.deleteRow.bind(this, row) } size="small">删除</Button>
                    </span>
                )
              }
            }
          ],
          data: []
        }
    }

    componentDidMount() {
        this.props.getArticles();
    }
    modifyRow = (row) => {
        history.push('/default/writearticle');
        this.props.changeState('modify', row._id);
    }
    deleteRow = (row) => {
        this.setState({ dialogVisible: true });
        deleteRowData = row;
    }

    deleteArticle = () => {
        this.setState({
            dialogVisible: false
        });
        Http.deleteArticle(deleteRowData._id);
    }


    render() {
        return (
            <div>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.props.articles}
                    border={true}
                    height={300}
                    highlightCurrentRow={true}
                    onCurrentChange={item=>{console.log(item)}}
                />
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
        articleState: state.filter.articleState
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles()),
        changeState: (...args) => dispatch(filterAction.changeState(...args))
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllArticle);