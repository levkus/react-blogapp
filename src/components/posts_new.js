import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  render() {
    const { fields: { title, categories, content }, handleSubmit, createPost } = this.props;
    return(
      <div>
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">Back to All Posts</Link>
        </div>
        <form onSubmit={handleSubmit(createPost)}>
          <h3>Create a new Post</h3>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" {...title}/>
            <p className="text-warning">{title.touched ? title.error : ''}</p>
          </div>
          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" {...categories}/>
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" {...content}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  return errors;
}

const formConfig = {
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}

export default reduxForm(formConfig, null, { createPost })(PostsNew);
