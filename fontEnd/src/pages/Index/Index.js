import React from 'react';
import { Responsive, Segment } from 'semantic-ui-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import Grid from 'react-bootstrap/lib/Grid';

import Header from '../../components/header/header';
import ArticleBrief from '../../components/articleBrief/articleBrief';
import Tags from '../../components/tags/tags';
import Newest from '../../components/newest/newest';
import Footer from '../../components/footer/footer';

import { Grid, Image } from 'semantic-ui-react';

import './Index.css';
import '../../static/css/bootstrap.min.css';

export default class index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }
    componentDidMount() {
        this.getTagsInfo();
    }
    // 获取tags信息
    getTagsInfo = () => {
        this.setState({
            tags: [{
                id: 1,
                name: "Electron",
                alias: "桌面化",
                nums: 123
            }, {
                id: 2,
                name: "HTML",
                alias: "HTML",
                nums: 123
            }, {
                id: 4,
                name: "CSS",
                alias: "CSS",
                nums: 123
            }, {
                id: 3,
                name: "Javascript",
                alias: "Javascript",
                nums: 123
            }]
        });
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="content-container">
                    <div className="col-sm-8 col-xs-12 content-brief">
                        <ArticleBrief key="0" />
                        <ArticleBrief key="1" />
                        <ArticleBrief key="2" />
                    </div>
                    <div className="col-sm-4 col-xs-0 article-info">
                        <Newest />
                        <Tags
                            tags={ this.state.tags }
                            />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}