import React from 'react';
import { Link } from "react-router-dom";
import { Image, Item } from 'semantic-ui-react';

import './articleBrief.scss';

export default class ArticleBrief extends React.Component {

    render() {
        return (
            <Item>
                {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                <Item.Content>
                    <Item.Header>
                        <Link to={`/index/detail/${this.props.article.articleId}`}>{ this.props.article.title }</Link>
                    </Item.Header>
                    {/* <Item.Meta>Description</Item.Meta> */}
                    <Item.Description>
                        { this.props.article.brief }
                    </Item.Description>
                    {/* <Item.Extra>Additional Details</Item.Extra> */}
                </Item.Content>
            </Item>
        );
    }
}