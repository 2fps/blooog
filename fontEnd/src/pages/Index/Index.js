import React from 'react';
import { Responsive, Segment } from 'semantic-ui-react'

import Header from '../../components/header/header';
import ArticleBrief from '../../components/articleBrief/articleBrief';
import Footer from '../../components/footer/footer';

import { Grid, Image } from 'semantic-ui-react';

import './Index.css';

export default class index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header/>
                <Segment.Group className="content-container">
                    <Responsive className="content-brief" as={Segment} minWidth={768}>
                        <ArticleBrief />
                        <ArticleBrief />
                    </Responsive>
                    <Responsive as={Segment} className="article-info" minWidth={768}>
                        Visible only if display has <code>992px</code> width and higher
                    </Responsive>
                </Segment.Group>
                <Grid>
                    <Grid.Column key="6">
                        <div>111111111111111111111111111111111111111111</div>
                    </Grid.Column>
                    <Grid.Column key="6">
                        <div>222222222222222222222222222222222222222222</div>
                    </Grid.Column>
                </Grid>
{/*                 <div className="content-container">
                    <div className="content-brief">
                        <ArticleBrief />
                        <ArticleBrief />
                    </div>
                    <div className="article-info">

                    </div>
                </div> */}
                <Footer />
            </div>
        );
    }
}