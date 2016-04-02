
import React, { Component, PropTypes } from 'react';

export default class CreateUser extends Component {
  static propTypes: {
    createUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired   
  };

   constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    var username = React.findDOMNode(this.refs.new_email).value.trim();
    var password = React.findDOMNode(this.refs.new_password).value.trim();
    
    this.props.createUser(username, password);
 }

  render() {
    var errorMessage = this.props.errorMessage;
    return (
      <div>
        <h3> Create new User </h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div >
              <label name="email">Email </label>
              <input type="email" name="new_email" ref="new_email" /> 
            </div>
            <div >
              <label name="password">Password </label>
              <input type="password" name="new_password" ref="new_password" />
            </div>
            <button type="submit" >Create User</button>
          </form>
          <div className="error"> {errorMessage} </div>
        </div>
      </div>
    );
  }                               
};
