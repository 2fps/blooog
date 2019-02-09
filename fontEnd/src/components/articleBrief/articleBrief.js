import React from 'react';
import { Link } from "react-router-dom";
import { Image, Item, Icon } from 'semantic-ui-react';

import './articleBrief.scss';

import { timeFormat } from '../../util/tool';

export default class ArticleBrief extends React.Component {

    render() {
        return (
            <Item>
                {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                <Item.Content>
                    <Item.Header>
                        <h2>
                            <Link to={`/index/detail/${this.props.article.articleId}`}>{ this.props.article.title }</Link>
                        </h2>
                    </Item.Header>
                    <Item.Meta>
                        <span className="article-subInfo">
                            <Icon name="calendar alternate"></Icon>&nbsp;
                            { timeFormat(this.props.article.publishTime) }
                        </span>
                        <span className="article-subInfo">
                            <Icon name="eye"></Icon>&nbsp;
                            { this.props.article.viewNums }次阅读
                        </span>
                        <span className="article-subInfo">
                            <Icon name="thumbs up outline"></Icon>&nbsp;
                            { this.props.article.likeNums }次点赞
                        </span>
                    </Item.Meta>
                    <Item.Description>
                        { this.props.article.brief }
                    </Item.Description>
                    {/* <Item.Extra>Additional Details</Item.Extra> */}
                </Item.Content>
            </Item>
        );
    }
}