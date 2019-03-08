import React from 'react';
import { Link } from "react-router-dom";


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import './newest.scss';

const styles = theme => ({
    
});

class Newest extends React.Component {
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    renderItem = () => {
        let temp = [];

        this.props.newest.forEach((item, ind) => {
            temp.push(
                <ListItem key={ ind } >
                    <ListItemText>
                        <Link to={`/index/detail/${item.articleId}`}>{ item.title }</Link>
                      </ListItemText>
                </ListItem>
            );
        });

        return (
            <List dense={false}>
                { temp }
            </List>
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="newest">
                <div className="newest-head">
                    <span className="newest-title">最新文章</span>
                </div>
                <div className="newest-content">
                    { this.renderItem() }
                </div>
            </div>
        );
    }
}
Newest.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Newest);