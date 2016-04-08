import * as types from '../constants/ActionTypes';

const initialState =  {
  creatingAlert: false,
  alerts: [{
      id: 12,
      editing: false,
      root_url: "http://google.com",
      scrape_level: 3,
      search_terms: ['search', 'lucky'],
      analysis_op: 'any_match',
      notification_type : 'email',
      last_ran: '5/11/14 13:00 GMT'
    },
    {
      id: 1,
      editing: false,
      root_url: "http://example.com",
      scrape_level: 3,
      search_terms: ['domain', 'example', 'icann'],
      analysis_op: 'any_match',
      notification_type : 'email',
      last_ran: '4/11/16 5:00 GMT'
    },
    {
      id: 13,
      editing: false,
      root_url: "http://geekwire.com",
      scrape_level: 3,
      search_terms: ['amazon', 'buys', 'microsoft cloud'],
      analysis_op: 'any_match',
      notification_type : 'email',
      last_ran: 'Yesterday'
    }]
}

const testValues = {  
  analysis_op: 'any_match',
  notification_type : 'email',
  last_ran: 'Yesterday'
};
// id root_url scrape_level search_terms analysis_op notification_type last_ran

export default function (state = initialState, action) {
  
  switch (action.type) {
    case types.TOGGLE_CREATING_ALERT:
      return {...state, creatingAlert: !state.creatingAlert};
    case types.CREATE_ALERT:
    // TODO -- add code to talk to server
      var id = Math.floor(Math.random() * 1000);
      return {
        ...state,
        alerts: [Object.assign({id: id}, testValues, action.newAlert), ...state.alerts]
      };
    case types.EDIT_ALERT:
      return {
          ...state,
          alerts: state.alerts.map((alert) => {
              if (alert.id === action.id) {
                return Object.assign({}, alert, action.newValues);
              } else {
                return alert;
              }
            })
        };
    case types.TOGGLE_EDIT_ALERT:
      return {
          ...state,
          alerts: state.alerts.map((alert) => {
              if (alert.id === action.id) {
                return Object.assign({}, alert, {editing: !alert.editing});
              } else {
                return alert;
              }
            })
        };
  
    case types.DELETE_ALERT:
      console.log("deleting result " + action.id);
      return {...state,
              alerts: state.alerts.filter((r) => r.id !== action.id)};

    default:
      return state;
  }
}
