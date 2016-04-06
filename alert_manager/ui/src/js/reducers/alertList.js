import * as types from '../constants/ActionTypes';

const initialState =  [
  {
    id: 12,
    root_url: "http://google.com",
    scrape_level: 3,
    search_terms: ['search', 'lucky'],
    'analysis_op': 'any_match',
    'notification_type' : 'email',
    'last_ran': '5/11/14 13:00 GMT'
  },
  {
    id: 1,
    root_url: "http://example.com",
    scrape_level: 3,
    search_terms: ['domain', 'example', 'icann'],
    'analysis_op': 'any_match',
    'notification_type' : 'email',
    'last_ran': '4/11/16 5:00 GMT'
  },
  {
    id: 13,
    root_url: "http://geekwire.com",
    scrape_level: 3,
    search_terms: ['amazon', 'buys', 'microsoft cloud'],
    'analysis_op': 'any_match',
    'notification_type' : 'email',
    'last_ran': 'Yesterday'
  },
];
// id root_url scrape_level search_terms analysis_op notification_type last_ran

export default function (state = initialState, action) {
  
  switch (action.type) {
    case types.CREATE_ALERT:
    // TODO -- add code to talk to server
      return [...state, Object.assign({id: 12}, action.newAlert)];
  
    case types.EDIT_ALERT:
      return state.map((alert) => {
        if (alert.id === action.id) {
          return Object.assign({}, alert, action.newValues);
        } else {
          return alert;
        }
      });
  
    case types.DELETE_ALERT:
      console.log("deleting result " + action.id);
      return state.filter((r) => r.id !== action.id);

    default:
      return state;
  }
}
