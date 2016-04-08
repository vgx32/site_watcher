
import React, { Component, PropTypes } from 'react';

export default class AlertInput extends Component {
  static propTypes: {
    createAlert: PropTypes.func.isRequired,
  };

   constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    var newAlert = {
      root_url : this.refs.root_url.value,
      search_terms : this.refs.search_terms.value.split(","),
      search_depth : parseInt(this.refs.search_depth.value, 10),
    };
    if (newAlert.search_terms && newAlert.root_url){
      this.props.createAlert(newAlert);
    } else {
      console.log("TODO: fail gracefully if user didn't submit a proper url/list of terms");
    }
 }

  handleCancel(e){
    this.props.cancel();
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div >
              <label name="root_url">Root URL</label>
              <input type="url" ref="root_url" /> 
            </div>
            <div >
              <label name="search_terms">Search Terms</label>
              <input type="text" ref="search_terms" /> 
            </div>
            <div >
              <label name="search_depth">Search Depth</label>
              <input type="number" ref="search_depth" min="0" max="3" defaultValue="1"/> 
            </div>
            <button type="submit" >Create Alert</button>
          </form>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }                               
};
