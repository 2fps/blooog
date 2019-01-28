import React from 'react';
import { Table, Icon, Tag, Button } from 'element-react';
import { connect } from 'react-redux';

import filterAction from '../../store/filter/filterAction';

import './showallarticle.css';

class ShowAllArticle extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          columns: [
            {
              type: 'index'
            },
            {
              label: "title",
              prop: "date",
              render: function(data){
                return (
                <span>
                    <span style={{marginLeft: '10px'}}>{data.title}</span>
                </span>)
              }
            },
            {
              label: "date",
              prop: "name",
              width: 160,
              render: function(data){
                return <span>{data.publishTime}</span>
              }
            },
            {
              label: "操作",
              prop: "address",
              width: 300,
              render: function(){
                return (
                    <span>
                        <Button plain={true} type="info" size="small">编辑</Button>
                        <Button type="danger" size="small">删除</Button>
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


    render() {
        return (
            <Table
                style={{width: '100%'}}
                columns={this.state.columns}
                data={this.props.articles}
                border={true}
                height={300}
                highlightCurrentRow={true}
                onCurrentChange={item=>{console.log(item)}}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.filter.articles
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 获取文章信息
        getArticles: (...args) => dispatch(filterAction.getArticles())
    }
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllArticle);