import React from 'react';
import axios from 'axios';

import './Tax.css';

import {
    Checkbox, 
    Input, Form, Table,
    Button, Message, List, Transition} from 'semantic-ui-react';

const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', ' 十一月', '十二月'];

let tableData = [];

export default class Tax extends React.Component {
    constructor() {
        super();
        this.state = {
            month: months.slice(0, 1),
            tax: [''],
            calcing: false,
            repeat: false
        };
    }
    changeRepeat = () => {
        let val = !this.state.repeat;

        this.setState({
            repeat: val
        });
    }
    handleAdd = () => {
        this.setState({
            month: months.slice(0, this.state.month.length + 1)
        });
        let tax = this.state.tax;
        
        tax.push('');

        this.setState({
            tax: [...tax]
        });
    }

    handleRemove = () => {
        this.setState({
            month: this.state.month.slice(0, -1)
        });

        let tax = this.state.tax;
        
        tax.splice(tax.length - 1);

        this.setState({
            tax: [...tax]
        });
    }
    onChange = (e, data) => {
        let ind = e.target.parentElement.getAttribute('data-id');

        this.state.tax[ind] = data.value - 0;

        this.setState({
            tax: [...this.state.tax]
        });
    }
    calcTax = (e) => {
        let tax = [];

        this.state.tax.forEach((item, ind) => {
            tax.push(parseFloat(item) || 0);
        });
        // 
        this.setState({
            tax: [...tax],
            calcing: true
        }, () => {
            console.log(this.state.tax);
        });

        if (this.state.repeat) {
            months.forEach((item, ind) => {
                tax[ind] = tax[0];
            });
        }

        // send
        axios.post('/extra/computeTaxByAddUp', tax)
        .then(function (res) {
            if (0 == res.data.code) {
                let data = res.data.data;

                tableData = data;
            }
        }).catch(() => {

        }).then((() => {
            this.setState({
                calcing: false
            }); 
        }));
    }
    componentDidMount() {
        axios.post('/login', JSON.stringify({
            password: "pmma",
            userName: "admin"
        }), {
            headers : {
                'Content-Type':'application/json;charset=utf-8'
            }
        }).then((res) => {
            if (0 != res.data.code) {
                alert('登录失败');
            }
        }, () => {
            alert('登录失败');
        });
    }
    renderTableHeader = () => {
        let temp = [];

        temp.push(<Table.HeaderCell></Table.HeaderCell>);

        tableData.forEach((item, ind) => {
            temp.push(
                <Table.HeaderCell>{ months[ ind ] }</Table.HeaderCell>
            );
        });

        return (
            <Table.Row>
                { temp }
            </Table.Row>
        );
    }
    renderTableBody = () => {
        let temp = [];

        temp.push(<Table.Cell>所需要交的税：</Table.Cell>);

        tableData.forEach((item, ind) => {
            temp.push(
                <Table.Cell>{ item.tax }</Table.Cell>
            );
        });

        return (
            <Table.Row>
                { temp }
            </Table.Row>
        );
    }
    componentWillReceiveProps() {
        debugger;
    }
    render() {
        const { month } = this.state;

        return (
            <div>
                <Message
                    warning
                    header='注意输入格式!'
                    content='每月不同则逐次增加并输入，每月相同则选中checkbox。'
                />
                <Button.Group>
                    <Button disabled={month.length === 0} icon='minus' onClick={this.handleRemove} />
                    <Button disabled={month.length === months.length} icon='plus' onClick={this.handleAdd} />
                </Button.Group>
                <Transition.Group as={List} duration={200} verticalAlign='middle'>
                    {month.map( (item, ind) => (
                        <List.Item key={ind}>
                            <label className="setting-field">{ item + '：' }</label>&nbsp;
                            <Input value={ this.state.tax[ind] } data-id={ ind } onChange={ this.onChange.bind(this) } />
                        </List.Item>
                    ))}
                </Transition.Group>
                <Form.Field className="form-control">
                    <Checkbox label='每月相同' toggle checked={ this.state.repeat } onChange={ this.changeRepeat } />
                </Form.Field>
                <Form.Field className="form-control">
                    <Button loading={ this.state.calcing } onClick={ this.calcTax }>计算</Button>
                </Form.Field>
                <Table singleLine className={`${ tableData.length ? '' : 'hidden'}`}>
                    <Table.Header>
                        { this.renderTableHeader() }
                    </Table.Header>
                    <Table.Body>
                        { this.renderTableBody() }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}