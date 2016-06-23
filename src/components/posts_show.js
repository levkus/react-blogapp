import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDelete() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        //post has been created, navigate to index
        this.context.router.push('/');
      });
  }

  render() {
    const { post } = this.props;

    if (!post ) {
      return <div>Loading...</div>
    }

    if (!post.title) {
      return (
        <div>
          <div className="text-xs-right">
            <Link to="/" className="btn btn-primary">Index</Link>
          </div>
          <div>
            404 Not found
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="text-xs-right">
          <button className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
          <Link to="/" className="btn btn-primary">Back to All Posts</Link>
        </div>
        <h2>{post.title}</h2>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.post
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
