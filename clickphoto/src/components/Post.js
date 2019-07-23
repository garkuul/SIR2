import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import {
  getComments,
  addlike,
  removelike,
  newcomment
} from "../actions/postActions";
import $ from "jquery";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false, comments: {} };

  handleExpandClick = id_publicacao => {
    console.log(id_publicacao);
    this.setState(state => ({ expanded: !state.expanded }));
    this.loadComments(id_publicacao);
  };

  loadComments = id_publicacao => {
    var arr = this.state.comments;
    this.props.getComments(id_publicacao).then(res => {
      if (res.comments) {
        var comm = this.state.comments;
        comm[id_publicacao] = { comments: res.comments.data };
        this.setState({ comments: comm });
      }
    });
  };

  handleLike = (id_publicacao, hasGosto) => {
    var body = {};
    if (!hasGosto) {
      body = {
        data: new Date(),
        id_user: this.props.user.id_user,
        id_publicacao: id_publicacao
      };
      this.props.addlike(body).then(res => {
        this.props.refresh();
      });
    } else {
      body = {
        id_user: this.props.user.id_user,
        id_publicacao: id_publicacao
      };
      this.props.removelike(body).then(res => {
        this.props.refresh();
      });
    }
  };

  handleComment = id_publicacao => {
    var comentario = $("#" + id_publicacao).val();
    var body = {
      comentario: comentario,
      id_user: this.props.user.id_user,
      id_publicacao: id_publicacao
    };

    this.props.newcomment(body).then(res => {
      this.props.refresh();
      
      var comm = this.state.comments;
      if(comm[id_publicacao].comments){
        comm[id_publicacao].comments.push({ username: this.props.user.username, comentario: comentario })
      }else{
        var arr = [];
        arr.push({ username: this.props.user.username, comentario: comentario });
        comm[id_publicacao] = { comments: arr };
      }
      
      $("#" + id_publicacao).val("")
      this.setState({ comments: comm });
    });
  };
  render() {
    const { classes, post } = this.props;

    return (
      <Card className={classes.card} style={{ maxWidth: 1000 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={post.username}
          subheader={post.data}
        />
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_URL_IMAGENS + post.fotopub}
        />
        <CardContent>
          <Typography component="p">{post.descricao}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Like"
            onClick={this.handleLike.bind(
              this,
              post.id_publicacao,
              post.hasGosto
            )}
          >
            {post.hasGosto ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <Typography component="p">{post.nr_gostos} Gosto(s) </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick.bind(this, post.id_publicacao)}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {this.state.comments[post.id_publicacao] &&
            this.state.comments[post.id_publicacao].comments.length > 0
              ? this.state.comments[post.id_publicacao].comments.map((c, i) => (
                  <div key={i} className="row justify-content-start">
                    <div className="col-2">
                      <span className="font-weight-bold">{c.username}</span>
                    </div>
                    <div className="col-9 ml-2">
                      <p class="text-justify">{c.comentario}</p>
                    </div>
                  </div>
                ))
              : null}
          </CardContent>
        </Collapse>
        <CardContent style={{ borderTop: "1px solid grey" }}>
          <div className="row justify-content-start">
            <div className="col-10">
              <InputBase
                id={post.id_publicacao}
                className={classes.margin}
                placeholder="Insert comment ..."
                fullWidth
                multiline
              />
            </div>
            <div className="col-2 text-right">
              <Button
                color="primary"
                className={classes.button}
                onClick={this.handleComment.bind(this, post.id_publicacao)}
              >
                POST
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  comments: state.posts.comments
});

export default connect(
  mapStateToProps,
  { getComments, addlike, removelike, newcomment }
)(withStyles(styles)(RecipeReviewCard));
