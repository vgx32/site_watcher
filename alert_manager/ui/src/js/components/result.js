import React, { Component, PropTypes } from 'react';

export default class Result extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    alert: PropTypes.number.isRequired,
    context: PropTypes.string.isRequired,
    deleteResult: PropTypes.func.isRequired
  };

  render(){
    return (
      <li> 
        <div> 
          {this.props.id}
        </div>
        <div> 
          <a href={this.props.url}> {this.props.url} </a>
        </div>
        <div> 
          <p>{this.props.context}</p>
        </div>
        <button onClick={this.props.deleteResult}>
          Delete?  
        </button>

      </li>
    );
  }
}