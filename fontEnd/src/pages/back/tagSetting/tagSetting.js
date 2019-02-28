import React from 'react';
import { Input, Button, Checkbox, Form, Table } from 'semantic-ui-react';

import './tagSetting.scss';

export default class TagSetting extends React.Component {
    renderTableBody() {
        let temp = [];

/*         this.props.articles.forEach((item, ind) => {
            temp.push(
                <Table.Row key={ ind }>
                    <Table.Cell>{ item.tagName }</Table.Cell>
                    <Table.Cell>{ item.tagNum }</Table.Cell>
                    <Table.Cell data-id={ item.articleId }>
                        <Button onClick={ this.modifyRow } size="small">编辑</Button>
                        <Button color="red" onClick={ this.deleteRow } size="small">删除</Button>
                    </Table.Cell>
                </Table.Row>
            );
        }); */

        return (
            <Table.Body>
                { temp }
            </Table.Body>
        );
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
                                <input placeholder='输入标签名称' />
                            </Form.Field>
                            <Form.Field>
                                <Button primary>添加新标签</Button>
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
                            </Table.Row>
                        </Table.Header>
                        { this.renderTableBody() }
                    </Table>
                </div>
            </div>
        );
    }
} 
