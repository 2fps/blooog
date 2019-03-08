import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './footer.scss';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        padding: '30px 0px',
        color: '#bdbdbd'
    }
});

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="footer" className={ classes.root }>
                <div className="container">
                    <p>
                        © 2019 <a href={ this.props.website.siteUrl }>{ this.props.website.siteName }</a>. Powered by <a href="https://github.com/2fps/blooog" target="_blank">blooog. </a>ALL RIGHTS RESERVED.
                    </p>
                    <p className={`${ this.props.website.webRecord ? '' : 'hide'}`}>
                        <a href="http://www.miitbeian.gov.cn" className="icpnum" target="_blank" rel="noopener noreferrer">{ this.props.website.webRecord }</a>
                    </p>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);