import * as ActionTypes from "../actions/constants";

export default function decksReducer(state = {}, action) {
	switch (action.type) {
		case ActionTypes.DECKS_POPULATE:
			state = { ...action.payload };
			break;
		case ActionTypes.DECKS_ADD_CARD:
			const card = action.payload;
			const deck = { ...state[card.deckId] };
			deck.questions = [...deck.questions, card];
			newstate = {
				...state,
				[deck.id]: deck
			};
			return newstate;
		case ActionTypes.DECKS_CREATE_NEW:
			const id = action.payload.deckName;
			newstate = {
				...state,
				[id]: {
					id,
					title: id,
					questions: []
				}
			};
			return newstate;
		default:
			break;
	}
	return state;
}
