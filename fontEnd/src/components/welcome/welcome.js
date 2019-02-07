import React from 'react';
import { Icon, Header, Statistic, Card, Transition } from 'semantic-ui-react';

import './welcome.scss';
import * as Http from '../../api/http';

export default class Welcome extends React.Component {

    constructor() {
        super();
        this.state = {
            allArticlesNum: 0
        }
    }
    renderData = () => {
        Http.getArticlesNumber().then((data) => {
            let da = data.data.data;

            this.setState({
                allArticlesNum: da.num
            });
        });
    }
    componentWillMount = () => {
        this.renderData();
    }
    render() {
        return (
            <div className="welcome">
                <Header as='h3'>欢迎使用blooog</Header>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Card.Header className="text-center">总文章数</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Statistic.Group>
                                <Statistic>
                                    <Statistic.Value>{ this.state.allArticlesNum }</Statistic.Value>
                                    <Statistic.Label>篇</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header className="text-center">总评论数</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Statistic.Group>
                                <Statistic>
                                    <Statistic.Value>0</Statistic.Value>
                                    <Statistic.Label>个</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header className="text-center">总预览数数</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Statistic.Group>
                                <Statistic>
                                    <Statistic.Value>0</Statistic.Value>
                                    <Statistic.Label>次</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        );
    }
}