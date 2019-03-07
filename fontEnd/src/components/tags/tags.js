import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './tags.scss';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class Tags extends React.Component {
    constructor(props) {
        super(props);
    }
    showTags = () => {
        let temp = [],
            { classes } = this.props;

        this.props.tags.forEach((item, ind) => {
            if (item.tagNum) {
                // 只显示有文章的标签
                temp.push(
                    <Chip
                        key={ ind }
                        label={ item.tagName }
                        className={ classes.chip }
                        // component="a"
                        // href="#chip"
                        clickable
                        variant="outlined"
                    />
                );
            }
        });

        return (
            <div className="tags-content">
                { temp }
            </div>
        );
    }
    render() {
        return (
            <div className="article-tags">
                <div className="tags-head">
                    <span className="tags-title">标签</span>
                </div>
                { this.showTags() }
            </div>
        );
    }
}

Tags.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Tags);