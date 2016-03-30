
import React, { Component, PropTypes } from 'react';

export default class CreateUser extends Component {
  static propTypes: {
    createUser: PropTypes.func.isRequired      
  };

   constructor(props, context) {
    super(props, context);

    this.state = {
      email: this.props.email || '',
      password: this.props.password || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // debugger;
    var email = React.findDOMNode(this.refs.new_email).value.trim();
    var password = React.findDOMNode(this.refs.new_password).value.trim();
    this.setState({ password: password, email: email});
    
  }

  handleSubmit(e) {
    // debugger;
    e.preventDefault()
    this.setState({errorMessage : ""});
    var username = React.findDOMNode(this.refs.new_email).value.trim();
    var password = React.findDOMNode(this.refs.new_password).value.trim();
    if (!username || !password) {
      this.setState({errorMessage :"username or password is empty"});
      return;
    }
    if (username.length < 5 || password.length < 6) {
      this.setState({errorMessage :"email field must be valid email and password at least 5 chars long"});
      return;       
    }
 }


  render() {
    var errorMessage = this.state.errorMessage;
    return (
      <div>
        <h3> Create new User </h3>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
          {errorMessage}
        </div>
      </div>
    );
  }                               
};
