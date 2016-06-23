import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';


class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const postList = this.props.posts.all.map(post => {
      return  <li key={post.id} className="list-group-item">
                <div>Title: {post.title}</div>
                <div>Categories: {post.categories}</div>
              </li>
    });

    console.log(postList);
    return(
      <div>
        <div className="text-xs-right">
          <Link to="posts/new" className="btn btn-primary">New Post</Link>
        </div>
        <div className="posts">
          <h3>Posts</h3>
          <ul className="list-group">
            {postList}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
