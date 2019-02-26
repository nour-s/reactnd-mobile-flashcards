import * as ActionTypes from "../actions/constants";

export default function decksReducer(state = {}, action) {
	switch (action.type) {
		case ActionTypes.DECKS_POPULATE:
			state = { ...state, ...action.payload };
			break;
		default:
			break;
	}
	return state;
}
