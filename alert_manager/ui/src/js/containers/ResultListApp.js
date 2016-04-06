
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ResultActions from '../actions/ResultActions';


import ResultList from "../components/resultList";

class ResultListApp extends Component {

  render () {
    const {resultList: {results}, actions} = this.props;
    return (
      <div>
        <h1>List of Results</h1>
        <ResultList results={results} actions={actions}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resultList: state.resultList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ResultActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultListApp);
