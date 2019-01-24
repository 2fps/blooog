import React from 'react';

import './articleBrief.css';

export default class ArticleBrief extends React.Component {


    render() {
        return (
            <div class="brief-card">
                <div class="brief-content">
                    <div class="brief-header">Matthew</div>
                    <div class="brief-meta">
                        <span class="brief-date">Joined in 2015</span>
                    </div>
                    <div class="brief-description">Matthew is a musician living in Nashville.</div>
                </div>
                <div class="brief-extra">
                    <span><i aria-hidden="true" class="user icon"></i>22 Friends</span>
                </div>
            </div>
        );
    }
}