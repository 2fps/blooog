import React from 'react';

import './footer.scss';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <p>
                        © 2019 <a href={ this.props.website.siteUrl }>{ this.props.website.siteName }</a>. Powered by <a href={ this.props.siteUrl } target="_blank" rel="noopener noreferrer">blooog. </a>ALL RIGHTS RESERVED.
                    </p>
                    <p className={`${ this.props.website.webRecord ? '' : 'hide'}`}>
                        <a href="http://www.miitbeian.gov.cn" className="icpnum" target="_blank" rel="noopener noreferrer">{ this.props.website.webRecord }</a>
                    </p>
                </div>
            </div>
        );
    }
}