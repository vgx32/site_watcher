
import React, { Component, PropTypes } from 'react';
import AlertInput from './alertInput';

export default class CreateAlert extends Component {
  static propTypes: {
    createAlert: PropTypes.func.isRequired,
    showCreateForm: PropTypes.bool.isRequired,
    toggleCreateForm: PropTypes.func.isRequired
  };

  handleShowCreate(){
    this.props.toggleCreateForm();
  }

  render() {
    if(this.props.showCreateForm){
      return (<AlertInput 
              createAlert={this.props.createAlert} 
              cancel={this.props.toggleCreateForm}/>);
    } else {
      return (
        <button onClick={this.handleShowCreate.bind(this)}> 
           Create Alert
        </button>);
    }
  }                               
};
