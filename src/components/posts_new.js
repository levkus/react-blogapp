import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(data) {
    this.props.createPost(data)
      .then(() => {
        //post has been created, navigate to index
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit} = this.props;
    return(
      <div>
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">Back to All Posts</Link>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a new Post</h3>
          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" placeholder={title.touched ? title.error : ''} className="form-control" {...title}/>
          </div>
          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" {...categories}/>
          </div>
          <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
            <label>Content</label>
            <textarea placeholder={content.touched ? content.error : ''} className="form-control" {...content}/>
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
  if (!values.content) {
    errors.content = 'Enter content';
  }

  return errors;
}

const formConfig = {
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}

export default reduxForm(formConfig, null, { createPost })(PostsNew);
