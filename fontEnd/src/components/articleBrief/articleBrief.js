import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// svg图标
import ThumbUp from '@material-ui/icons/ThumbUp';
import Visibility from '@material-ui/icons/Visibility';

import './articleBrief.scss';

import { timeFormat } from '../../util/tool';

const styles = theme => ({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class ArticleBrief extends React.Component {
    render() {
        return (
            <Paper className="article-content">
                <Card className="">
                    <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                            { timeFormat(this.props.article.publishTime) }
                        </Typography>
                        <Typography variant="h5" component="h2">
                            <Link to={`/index/detail/${this.props.article.articleId}`}>{ this.props.article.title }</Link>
                        </Typography>
                        <Typography color="textSecondary" className="margin-bottom-12">
                            <span className="article-subInfo">
                                <Visibility className="icon-brief" />&nbsp;
                                { this.props.article.viewNums }次阅读
                            </span>
                            <span className="article-subInfo">
                                <ThumbUp className="icon-brief" />&nbsp;
                                { this.props.article.likeNums }次点赞
                            </span>
                        </Typography>
                        <Typography component="p">
                            { this.props.article.brief }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small"><Link to={`/index/detail/${this.props.article.articleId}`}>查看更多...</Link></Button>
                    </CardActions>
            </Card>
          </Paper>
        );
    }
}

export default ArticleBrief;