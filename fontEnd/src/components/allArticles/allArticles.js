import React from 'react';

import ArticleBrief from '../articleBrief/articleBrief';

import './allArticles.css';

export default class AllArticles extends React.Component {

    render() {
        return (
            <div className="brief-card">
                <ArticleBrief key="0" />
                <ArticleBrief key="1" />
            </div>
        );
    }
}