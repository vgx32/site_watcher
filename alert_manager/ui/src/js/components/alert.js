import React, { Component, PropTypes } from 'react';

import AlertInput from './alertInput';

export default class Alert extends Component {

   static propTypes = {
    id: PropTypes.number.isRequired,
    root_url: PropTypes.string.isRequired,
    scrape_level: PropTypes.number.isRequired,
    search_terms: PropTypes.array.isRequired,
    analysis_op: PropTypes.string.isRequired,
    notification_type: PropTypes.string.isRequired,
    last_ran: PropTypes.string.isRequired,
    editAlert: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    deleteAlert: PropTypes.func.isRequired
  };

  displayAlert() {
    return (
      <li> 
        <div> 
          id: {this.props.id}
        </div>
        <div> 
          url: <a href={this.props.root_url}> {this.props.root_url} </a>
        </div>
        <div> 
          Search Depth: {this.props.scrape_level}
        </div>
        <ul>
          {this.props.search_terms.map(term => (<li><div> {term} </div></li>))}
        </ul>
        <div>
          Analysis op: {this.props.analysis_op}
        </div>
        <div>
          Notification Type: {this.props.notification_type}
        </div>

        <div>
          Last ran: {this.props.last_ran}
        </div>
        <button onClick={this.props.toggleEdit}>
          Edit  
        </button>
        <button onClick={this.props.deleteAlert}>
          Delete
        </button>

      </li>
    );
  }

  render(){
    if(this.props.editing){
      return <AlertInput 
        confirmText="Confirm" 
        confirmAlertInput={this.props.editAlert}
        cancel={this.props.toggleEdit}
        defaultURL={this.props.root_url}
        defaultTerms={this.props.search_terms.join(", ")}
        defaultDepth={this.props.scrape_level}/>
    } else{
      return this.displayAlert();
    }
  }
}