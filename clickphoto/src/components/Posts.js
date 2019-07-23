import React, { Component } from "react";
import { connect } from "react-redux";
import { getPubs } from "../actions/postActions";
import Post from "./Post";
import Container from "@material-ui/core/Container";

class Posts extends Component {
  componentWillMount = () => {
    this.props.getPubs(this.props.user.id_user);
  };

  refreshData = () => {
    this.props.getPubs(this.props.user.id_user);
  }

  render() {
    console.log(this.props.posts);
    return (
      <div className="container">
        {this.props.posts.data
          ? this.props.posts.data.map((p, i) => (
              <div key={i} className="row justify-content-center mt-4 mb-2">
                <div className="col-8">
                  <Post post={p} user={this.props.user} refresh={this.refreshData}/>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { getPubs }
)(Posts);
