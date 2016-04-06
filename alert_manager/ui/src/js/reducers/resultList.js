import * as types from '../constants/ActionTypes';

const initialState = [
    {
      id: 0,
      url: "http://google.com",
      alert: 12,
      context: "There is some sample text here."
    },
    {
      id: 32,
      url: "http://example.com",
      alert: 1,
      context: "This domain is established to be used for illustrative examples in documents. You may use this domain in examples without prior coordination or asking for permission."
    },
    {
      id: 7,
      url: "http://geekwire.com",
      alert: 13,
      context: "I wrote a lot of other random things here; so here goes nothin.. what do you think about the world? Reactjs is a little bit weird at times"
    },
  ];

// 'id', 'owner' ,'url', 'alert', 'context'

export default function (state = initialState, action) {
  switch (action.type) {
    case types.DELETE_RESULT:
      console.log("deleting result " + action.id);
      return {results: state.filter((r) => r.id !== action.id)};

    default:
      return state;
  }
}
